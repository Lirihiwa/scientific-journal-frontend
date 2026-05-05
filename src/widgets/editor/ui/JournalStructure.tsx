// src/widgets/editor/ui/JournalStructure.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Library, Plus, Layers } from 'lucide-react';
import { journalApi } from '../../../entities/journal/api/journal.api';
import { Button } from '../../../shared/ui/Button';
import { toast } from 'sonner';
import {apiClient} from "../../../shared/api/client.ts";
import type {CreateIssueRequest} from "../../../features/editor/model/types.ts";

export const JournalStructure = () => {
    const queryClient = useQueryClient();
    const { data: volumes, isLoading } = useQuery({ queryKey: ['editor-volumes'], queryFn: journalApi.getVolumes });

    const createIssueMutation = useMutation({
        mutationFn: async (vars: { volId: string, num: number }) => {
            return apiClient.post('/journal/issues', {
                volume_id: vars.volId,
                number: vars.num,
                status: 'published',
                publication_date: new Date().toISOString().split('T')[0]
            } as CreateIssueRequest);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editor-all-issues'] });
            toast.success("Выпуск успешно создан");
        }
    });

    if (isLoading) return <div className="h-64 bg-muted animate-skeleton" />;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fade-in">
            {/* Боковая панель создания Тома (упрощенно) */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-card border-t-4 border-accent p-8 shadow-sm">
                    <h3 className="text-lg font-heading font-bold italic mb-4">Новый том</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-accent mb-6">Создание годового архива</p>
                    <Button className="w-full" variant="outline" onClick={() => toast.info("Функция в разработке")}>
                        Инициализировать том {new Date().getFullYear()}
                    </Button>
                </div>
            </div>

            {/* Список томов и выпусков */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xs font-accent font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                    <Library size={14} className="text-primary" /> Дерево публикаций
                </h2>
                <div className="space-y-4">
                    {volumes?.map(vol => (
                        <div key={vol.id} className="bg-card border border-border p-6 flex justify-between items-center group hover:border-primary transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary">
                                    <Layers size={24} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-accent font-bold text-primary uppercase">Year {vol.year}</span>
                                    <h4 className="text-xl font-heading font-bold italic">Volume {vol.number}</h4>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100"
                                onClick={() => {
                                    const numStr = prompt("Введите номер нового выпуска:");

                                    if (numStr) {
                                        const num = parseInt(numStr, 10);
                                        if (!isNaN(num)) {
                                            createIssueMutation.mutate({ volId: vol.id, num: num })
                                        } else {
                                            toast.error("Номер должен быть числом")
                                        }
                                    }
                                }}
                            >
                                <Plus size={14} className="mr-2" /> Добавить выпуск
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};