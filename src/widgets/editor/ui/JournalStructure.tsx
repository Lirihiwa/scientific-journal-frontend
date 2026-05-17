import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Library, Plus, Layers } from 'lucide-react';
import { journalApi } from '../../../entities/journal/api/journal.api';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { toast } from 'sonner';

export const JournalStructure = () => {
    const queryClient = useQueryClient();
    const { data: volumes, isLoading } = useQuery({ queryKey: ['editor-volumes'], queryFn: journalApi.getVolumes });

    const [isVolumeModalOpen, setVolumeModalOpen] = useState(false);
    const [isIssueModalOpen, setIssueModalOpen] = useState(false);
    const [selectedVolumeId, setSelectedVolumeId] = useState<string | null>(null);

    const createVolumeMutation = useMutation({
        mutationFn: journalApi.createVolume,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-volumes'] });
            setVolumeModalOpen(false);
            toast.success("Том успешно создан");
        }
    });

    const createIssueMutation = useMutation({
        mutationFn: journalApi.createIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-all-issues'] });
            setIssueModalOpen(false);
            toast.success("Выпуск успешно создан");
        }
    });

    if (isLoading) return <div className="h-64 bg-muted animate-skeleton" />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                    <Library size={20} className="text-primary" /> Структура архива
                </h2>
                <Button onClick={() => setVolumeModalOpen(true)}><Plus size={16} className="mr-2"/> Новый том</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {volumes?.map(vol => (
                    <div key={vol.id} className="bg-card border border-border p-6 flex justify-between items-center rounded-sm hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary rounded-sm">
                                <Layers size={24} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-accent font-bold text-primary uppercase">Year {vol.year}</span>
                                <h4 className="text-xl font-heading font-bold">Том {vol.number}</h4>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedVolumeId(vol.id); setIssueModalOpen(true); }}>
                            <Plus size={14} className="mr-2" /> Добавить выпуск
                        </Button>
                    </div>
                ))}
            </div>

            {/* Модалка создания тома */}
            <Modal isOpen={isVolumeModalOpen} onClose={() => setVolumeModalOpen(false)} title="Создание нового тома">
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    createVolumeMutation.mutate({
                        year: parseInt(formData.get("year") as string),
                        number: parseInt(formData.get("number") as string),
                        status: 'draft'
                    });
                }}>
                    <Input name="year" label="Год" type="number" defaultValue={new Date().getFullYear()} />
                    <Input name="number" label="Номер тома" type="number" />
                    <Button className="w-full" isLoading={createVolumeMutation.isPending}>Создать том</Button>
                </form>
            </Modal>

            {/* Модалка создания выпуска */}
            <Modal isOpen={isIssueModalOpen} onClose={() => setIssueModalOpen(false)} title="Создание выпуска">
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    createIssueMutation.mutate({
                        volume_id: selectedVolumeId!,
                        number: parseInt(formData.get("number") as string),
                        status: 'draft'
                    });
                }}>
                    <Input name="number" label="Номер выпуска" type="number" />
                    <Button className="w-full" isLoading={createIssueMutation.isPending}>Создать выпуск</Button>
                </form>
            </Modal>
        </div>
    );
};