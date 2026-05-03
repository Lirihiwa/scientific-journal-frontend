import {useQuery} from '@tanstack/react-query';
import {journalApi} from '../../../api/journal';
import {BookOpen, ChevronRight} from 'lucide-react';
import {Link} from "react-router-dom";

export const ArchivePage = () => {
    const {data: volumes, isLoading} = useQuery({
        queryKey: ['volumes'],
        queryFn: () => journalApi.getVolumes().then(res => res.data)
    });

    if (isLoading) return <div className="p-20 text-center">Загрузка архива...</div>; // // LOC archive.loading

    return (
        <div className="py-12 px-4 max-w-5xl mx-auto">
            <h1 className="text-4xl font-heading italic mb-12 text-center">Архив
                номеров</h1> {/* // LOC archive.title */}

            <div className="space-y-8">
                {volumes?.map((vol) => (
                    <div key={vol.id} className="bg-white shadow-card p-8 border-l-4 border-primary">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-heading">Том {vol.number} ({vol.year})</h2> {/* // LOC archive.volume.title */}
                                {vol.title && <p className="text-semi-transparent italic text-sm">{vol.title}</p>}
                            </div>
                            <BookOpen size={32} className="text-grey-200"/>
                        </div>

                        {/* Список выпусков в томе */}
                        <IssuesList volumeId={vol.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Вспомогательный компонент для загрузки выпусков внутри тома
const IssuesList = ({volumeId}: { volumeId: string }) => {
    const {data: issues} = useQuery({
        queryKey: ['issues', volumeId],
        queryFn: () => journalApi.getIssuesByVolume(volumeId).then(res => res.data)
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues?.map((issue) => (
                <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`} // Используем Link вместо href
                    className="flex items-center justify-between p-4 border border-border hover:bg-grey-50 hover:border-accent transition-all group"
                >
                    <span className="font-accent font-bold uppercase text-xs tracking-widest text-primary">
                      Выпуск №{issue.number}
                    </span>
                    <ChevronRight size={16} className="text-muted group-hover:text-accent transition-colors"/>
                </Link>
            ))}
        </div>
    );
};