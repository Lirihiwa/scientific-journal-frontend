import { useTranslation } from 'react-i18next';
import { UserCheck, Users, GraduationCap, MapPin } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const EditorialPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const boardMembers = [
        {
            nameRu: "Волкова Елена Вениаминовна",
            nameEn: "Volkova Elena Veniaminovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Институт психологии Российской академии наук",
            orgEn: "Institute of Psychology of the Russian Academy of Sciences",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Дейнека Ольга Сергеевна",
            nameEn: "Deyneka Olga Sergeevna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Санкт-Петербургский государственный университет",
            orgEn: "Saint Petersburg State University",
            cityRu: "Санкт-Петербург",
            cityEn: "Saint Petersburg",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Денисова Екатерина Геннадьевна",
            nameEn: "Denisova Ekaterina Gennadievna",
            degreeRu: "кандидат психологических наук",
            degreeEn: "PhD in Psychology",
            orgRu: "Донской государственный технический университет",
            orgEn: "Don State Technical University",
            cityRu: "Ростов-на-Дону",
            cityEn: "Rostov-on-Don",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Копцева Наталья Петровна",
            nameEn: "Koptseva Natalya Petrovna",
            degreeRu: "доктор философских наук",
            degreeEn: "Doctor of Philosophy",
            orgRu: "Сибирский Федеральный университет",
            orgEn: "Siberian Federal University",
            cityRu: "Красноярск",
            cityEn: "Krasnoyarsk",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Косоногов Владимир Владимирович",
            nameEn: "Kosonogov Vladimir Vladimirovich",
            degreeRu: "доктор философских наук",
            degreeEn: "Doctor of Philosophy",
            orgRu: "Национальный исследовательский университет «Высшая школа экономики»",
            orgEn: "National Research University Higher School of Economics",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Тихомирова Татьяна Николаевна",
            nameEn: "Tikhomirova Tatyana Nikolaevna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Психологический институт Российской академии образования",
            orgEn: "Psychological Institute of the Russian Academy of Education",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Россия",
            countryEn: "Russia"
        },
        {
            nameRu: "Карлос Рамос",
            nameEn: "Carlos Ramos",
            degreeRu: "доктор философии (PhD)",
            degreeEn: "PhD",
            orgRu: "Католический университет Эквадора",
            orgEn: "Catholic University",
            cityRu: "Кито",
            cityEn: "Quito",
            countryRu: "Эквадор",
            countryEn: "Ecuador"
        }
    ];

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "Редакционная коллегия" : "Editorial Board"}
                subtitle="Scientific Leadership"
            />

            <section className="space-y-6">
                <SectionHeader title={isRu ? "Главный редактор" : "Editor-in-Chief"} />
                <Card variant="accent" className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                        <UserCheck size={28} />
                    </div>
                    <div className="space-y-3 font-serif">
                        <h3 className="text-2xl font-sans font-bold text-foreground">
                            {isRu ? "Информация ожидается" : "Information Pending"}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {isRu
                                ? "Назначение главного редактора журнала в данный момент находится на стадии утверждения редакционным советом университета."
                                : "The appointment of the Editor-in-Chief is currently being finalized by the university's academic and editorial council."}
                        </p>
                    </div>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                    <Users className="text-primary shrink-0" size={20} />
                    <h2 className="text-lg md:text-xl font-heading font-bold text-foreground">
                        {isRu ? "Ассоциированные редакторы" : "Associate Editors"}
                    </h2>
                    <div className="h-px flex-grow bg-border ml-4 opacity-30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {boardMembers.map((member, i) => (
                        <Card key={i} variant="flat" className="p-6 bg-card border border-border flex gap-4">
                            <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center rounded-full shrink-0">
                                <GraduationCap size={20} />
                            </div>
                            <div className="space-y-2 text-xs font-serif">
                                <h4 className="text-base font-sans font-bold text-foreground leading-snug">
                                    {isRu ? member.nameRu : member.nameEn}
                                </h4>
                                <p className="text-primary font-accent uppercase tracking-tight text-[10px]">
                                    {isRu ? member.degreeRu : member.degreeEn}
                                </p>
                                <p className="text-foreground/80 leading-relaxed">
                                    {isRu ? member.orgRu : member.orgEn}
                                </p>
                                <p className="text-muted-foreground flex items-center gap-1.5 pt-1">
                                    <MapPin size={12} className="text-primary/70" />
                                    <span>{(isRu ? `${member.cityRu}, ${member.countryRu}` : `${member.cityEn}, ${member.countryEn}`)}</span>
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
};