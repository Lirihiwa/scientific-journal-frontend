import { useQuery } from '@tanstack/react-query';
import { journalApi } from '../../../api/journal';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

export const ArchivePage = () => {
    const { data: volumes, isLoading } = useQuery({
        queryKey: ['volumes'],
        queryFn: () => journalApi.getVolumes().then(res => res.data)
    });

    if (isLoading) return (
        <div className="py-12 px-4 max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="h-12 w-48 skeleton mx-auto mb-12" />
            {[1, 2].map(i => <div key={i} className="h-64 w-full skeleton" />)}
        </div>
    );

    return (
        <div className="py-12 px-4 max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-heading italic mb-12 text-center text-primary">Архив номеров</h1>
            <div className="space-y-12">
                {volumes?.map((vol) => (
                    <div key={vol.id} className="bg-white shadow-card p-8 border-l-4 border-primary group hover:border-accent transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-heading text-primary group-hover:text-accent transition-colors">Том {vol.number}</h2>
                                <p className="text-muted-foreground font-accent font-bold uppercase text-[10px] tracking-widest mt-1">{vol.year} год</p>
                                {vol.title && <p className="text-semi-transparent italic text-sm mt-2">{vol.title}</p>}
                            </div>
                            <BookOpen size={48} className="text-grey-100 group-hover:text-accent/10 transition-colors" />
                        </div>
                        <IssuesList volumeId={vol.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const IssuesList = ({ volumeId }: { volumeId: string }) => {
    const { data: issues } = useQuery({
        queryKey: ['issues', volumeId],
        queryFn: () => journalApi.getIssuesByVolume(volumeId).then(res => res.data)
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues?.map((issue) => (
                <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    className="flex items-center justify-between p-5 border border-border bg-grey-50 hover:bg-white hover:border-accent hover:shadow-lg transition-all group/item"
                >
                    <div className="flex flex-col">
                        <span className="font-accent font-bold uppercase text-[11px] tracking-widest text-primary group-hover/item:text-accent">
                            Выпуск №{issue.number}
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-1">
                            {issue.publication_date ? new Date(issue.publication_date).toLocaleDateString() : '—'}
                        </span>
                    </div>
                    <ChevronRight size={18} className="text-muted group-hover/item:text-accent group-hover/item:translate-x-1 transition-all" />
                </Link>
            ))}
        </div>
    );
};