import { User as UserIcon, Mail, Building, Globe, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSessionStore } from '../../stores/session.store';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { PageContainer } from "../../components/ui/PageContainer";

export const ProfilePage = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const { user } = useSessionStore();

    if (!user) return null;

    return (
        <PageContainer>
            <PageHeader
                title={t('nav.profile')}
                subtitle="Author Identity"
            />

            <Card padding="none" className="overflow-hidden flex flex-col md:flex-row">
                <div className="p-12 bg-muted/30 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border min-w-[300px]">
                    <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-6 shadow-xl">
                        <UserIcon size={48} />
                    </div>
                    <div className="px-4 py-1 bg-primary text-primary-foreground text-[9px] font-accent font-bold uppercase tracking-widest rounded-full">
                        {t(`common.roles.${user.role_code}`)}
                    </div>
                </div>

                <div className="p-12 space-y-10 flex-grow">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-heading font-bold">
                            {user.last_name} {user.first_name} {user.middle_name || ''}
                        </h2>
                        <p className="flex items-center gap-2 text-muted-foreground font-serif text-lg">
                            <Mail size={18} className="text-primary" />
                            {user.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                        <div className="space-y-4">
                            <h4 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                {t('auth.organization')}
                            </h4>
                            <p className="text-sm font-bold flex items-center gap-2">
                                <Building size={16} className="text-primary" />
                                {user.organization || (isRu ? 'Не указана' : 'Not specified')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                {t('auth.country')}
                            </h4>
                            <p className="text-sm font-bold flex items-center gap-2">
                                <Globe size={16} className="text-primary" />
                                {user.country || (isRu ? 'Не указана' : 'Not specified')}
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border">
                        <Link
                            to="/submissions"
                            className="flex items-center justify-between gap-4 p-5 bg-muted/30 border border-border rounded-sm hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                        >
                            <span className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                                    <FileText size={18} />
                                </span>
                                <span>
                                    <span className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                        {t('nav.my_submissions')}
                                    </span>
                                    <span className="block text-xs text-muted-foreground font-serif">
                                        {isRu ? 'Просмотр и управление вашими рукописями' : 'View and manage your manuscripts'}
                                    </span>
                                </span>
                            </span>
                            <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    </div>
                </div>
            </Card>
        </PageContainer>
    );
};