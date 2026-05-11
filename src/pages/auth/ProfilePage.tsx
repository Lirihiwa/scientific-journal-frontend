// src/pages/auth/ProfilePage.tsx
import { User as UserIcon, Mail, Building, Globe } from 'lucide-react';
import { useSessionStore } from '../../entities/session/model/store';
import { Card } from '../../shared/ui/Card';
import { PageHeader } from '../../shared/ui/PageHeader';
import {PageContainer} from "../../shared/ui/PageContainer.tsx";

export const ProfilePage = () => {
    const { user } = useSessionStore();
    if (!user) return null;

    return (
        <PageContainer>
            <PageHeader title="Профиль автора" subtitle="Author Identity" />
            <Card padding="none" className="overflow-hidden flex flex-col md:flex-row">
                <div className="p-12 bg-muted/30 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border min-w-[300px]">
                    <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-6 shadow-xl"><UserIcon size={48} /></div>
                    <div className="px-4 py-1 bg-primary text-primary-foreground text-[9px] font-accent font-bold uppercase tracking-widest rounded-full">{user.role_code}</div>
                </div>
                <div className="p-12 space-y-10 flex-grow">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-heading font-bold">{user.last_name} {user.first_name}</h2>
                        <p className="flex items-center gap-2 text-muted-foreground font-serif text-lg"><Mail size={18} className="text-primary" /> {user.email}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                        <div className="space-y-4">
                            <h4 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">Организация</h4>
                            <p className="text-sm font-bold flex items-center gap-2"><Building size={16} className="text-primary" /> {user.organization || 'Не указана'}</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[9px] font-accent font-bold uppercase tracking-widest text-muted-foreground mb-1">Страна</h4>
                            <p className="text-sm font-bold flex items-center gap-2"><Globe size={16} className="text-primary" /> {user.country || 'Не указана'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </PageContainer>
    );
};