// src/widgets/editor/ui/JournalStructure.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Library, Plus, Layers } from 'lucide-react';
import { journalApi } from '../../../entities/journal/api/journal.api';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { toast } from 'sonner';

export const JournalStructure = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const queryClient = useQueryClient();

    const { data: volumes, isLoading } = useQuery({
        queryKey: ['editor-volumes'],
        queryFn: journalApi.getVolumes
    });

    const [isVolumeModalOpen, setVolumeModalOpen] = useState(false);
    const [isIssueModalOpen, setIssueModalOpen] = useState(false);
    const [selectedVolumeId, setSelectedVolumeId] = useState<string | null>(null);

    const createVolumeMutation = useMutation({
        mutationFn: journalApi.createVolume,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-volumes'] });
            setVolumeModalOpen(false);
            toast.success(isRu ? "Том успешно создан" : "Volume created successfully");
        }
    });

    const createIssueMutation = useMutation({
        mutationFn: journalApi.createIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-all-issues'] });
            setIssueModalOpen(false);
            toast.success(isRu ? "Выпуск успешно создан" : "Issue created successfully");
        }
    });

    if (isLoading) return <div className="h-64 bg-muted animate-skeleton rounded-sm" />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                    <Library size={20} className="text-primary" />
                    {isRu ? 'Структура архива' : 'Archive Structure'}
                </h2>
                <Button onClick={() => setVolumeModalOpen(true)}>
                    <Plus size={16} className="mr-2"/> {isRu ? 'Новый том' : 'New Volume'}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {volumes?.map(vol => (
                    <div key={vol.id} className="bg-card border border-border p-6 flex justify-between items-center rounded-sm hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary rounded-sm">
                                <Layers size={24} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-accent font-bold text-primary uppercase">
                                    {isRu ? 'Год' : 'Year'} {vol.year}
                                </span>
                                <h4 className="text-xl font-heading font-bold">
                                    {isRu ? `Том ${vol.number}` : `Volume ${vol.number}`}
                                </h4>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedVolumeId(vol.id); setIssueModalOpen(true); }}>
                            <Plus size={14} className="mr-2" /> {isRu ? 'Добавить выпуск' : 'Add Issue'}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Модалка создания тома */}
            <Modal
                isOpen={isVolumeModalOpen}
                onClose={() => setVolumeModalOpen(false)}
                title={isRu ? "Создание нового тома" : "Create New Volume"}
            >
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    createVolumeMutation.mutate({
                        year: parseInt(formData.get("year") as string),
                        number: parseInt(formData.get("number") as string),
                        status: 'draft'
                    });
                }}>
                    <Input name="year" label={isRu ? "Год" : "Year"} type="number" defaultValue={new Date().getFullYear()} />
                    <Input name="number" label={isRu ? "Номер тома" : "Volume Number"} type="number" />
                    <Button className="w-full" isLoading={createVolumeMutation.isPending}>
                        {isRu ? 'Создать том' : 'Create Volume'}
                    </Button>
                </form>
            </Modal>

            {/* Модалка создания выпуска */}
            <Modal
                isOpen={isIssueModalOpen}
                onClose={() => setIssueModalOpen(false)}
                title={isRu ? "Создание выпуска" : "Create Issue"}
            >
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    createIssueMutation.mutate({
                        volume_id: selectedVolumeId!,
                        number: parseInt(formData.get("number") as string),
                        status: 'draft'
                    });
                }}>
                    <Input name="number" label={isRu ? "Номер выпуска" : "Issue Number"} type="number" />
                    <Button className="w-full" isLoading={createIssueMutation.isPending}>
                        {isRu ? 'Создать выпуск' : 'Create Issue'}
                    </Button>
                </form>
            </Modal>
        </div>
    );
};