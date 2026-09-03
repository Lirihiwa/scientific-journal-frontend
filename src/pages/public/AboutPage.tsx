import { useTranslation } from 'react-i18next';
import { Mail, Phone, User, Languages, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const AboutPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "О журнале" : "About the Journal"}
                subtitle="Scientific Cognitive Platform"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <Card padding="md">
                        <p className="font-serif text-base leading-relaxed text-justify text-foreground/90">
                            {isRu ? (
                                "Журнал является платформой для научных исследований и академических дискуссий по междисциплинарным проблемам когнитивной науки. Основная цель журнала — обсудить перспективы и инновации, касающиеся основных вопросов когнитивной науки, опубликовать новые научные результаты исследований в этой сфере, включая исследования когнитивных процессов, эмоций, восприятия, памяти, мышления, принятия решений, планирования, убеждений, метакогниций, образования и преподавания, способностей и интеллекта, изучения сознания; исследования когнитивного развития человека и формирования базовых когнитивных навыков в повседневной жизни."
                            ) : (
                                "The journal serves as a platform for scientific research and academic discussions on interdisciplinary problems of cognitive science. The main goal of the journal is to discuss prospects and innovations related to key issues of cognitive science, and to publish new scientific research results in this area, including studies on cognitive processes, emotions, perception, memory, thinking, decision-making, planning, beliefs, metacognition, education and teaching, abilities and intelligence, and the study of consciousness; as well as human cognitive development and the formation of basic cognitive skills in everyday life."
                            )}
                        </p>
                        <p className="font-serif text-base leading-relaxed text-justify text-foreground/90 mt-4">
                            {isRu ? (
                                "Широкий фокус журнала охватывает поведенческие, когнитивные науки и науки о мозге. Журнал стремится стимулировать появление и апробацию новых научных идей в когнитивистике путем взаимодействия специалистов из мирового научного сообщества."
                            ) : (
                                "The broad focus of the journal spans behavioral, cognitive, and brain sciences. The journal aims to stimulate the generation and testing of new scientific ideas in cognitive science through active interaction among specialists within the global scientific community."
                            )}
                        </p>
                    </Card>

                    <div className="space-y-4">
                        <SectionHeader title={isRu ? "Основные темы" : "Main Topics"} />
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(isRu ? [
                                "Когнитивная психология",
                                "Когнитивные исследования в образовании",
                                "Когнитивная педагогика",
                                "Исследования когнитивной культуры",
                                "Когнитивная нейрофизиология",
                                "Нейропсихология когнитивной деятельности",
                                "Когнитивные аспекты спортивной деятельности",
                                "Методология в когнитивной науке",
                                "Развитие среды обучения",
                                "Образовательные технологии",
                                "Инновационные педагогические модели",
                                "Онлайн-образование",
                                "Технологии преподавания и обучения",
                                "Социальная когнитивная психология",
                                "Когнитивная психология развития"
                            ] : [
                                "Cognitive psychology",
                                "Cognitive research in education",
                                "Cognitive pedagogy",
                                "Cognitive culture research",
                                "Cognitive neurophysiology",
                                "Neuropsychology of cognitive activity",
                                "Cognitive aspects of sports activity",
                                "Methodology in cognitive science",
                                "Development of the learning environment",
                                "Educational technologies",
                                "Innovative pedagogical models",
                                "Online education",
                                "Teaching and learning technologies",
                                "Social cognitive psychology",
                                "Cognitive developmental psychology"
                            ]).map((topic, i) => (
                                <li key={i} className="flex items-baseline gap-2 text-sm font-serif text-foreground/80">
                                    <span className="text-primary shrink-0 leading-none relative top-[-0.05em]">•</span>
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card variant="accent" padding="md" className="space-y-4">
                        <h3 className="text-xs font-accent font-bold uppercase tracking-widest text-primary">
                            {isRu ? "Параметры издания" : "Publication Info"}
                        </h3>

                        <div className="space-y-3">
                            <div className="flex gap-3 text-xs font-serif">
                                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block font-sans uppercase text-[10px] tracking-wider text-muted-foreground">
                                        {isRu ? "Рецензирование" : "Peer Review"}
                                    </strong>
                                    <span>{isRu ? "Двойное слепое экспертное" : "Double-blind peer review"}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 text-xs font-serif">
                                <Languages size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block font-sans uppercase text-[10px] tracking-wider text-muted-foreground">
                                        {isRu ? "Языки публикаций" : "Languages"}
                                    </strong>
                                    <span>{isRu ? "Русский, английский" : "Russian, English"}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 text-xs font-serif">
                                <RefreshCw size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block font-sans uppercase text-[10px] tracking-wider text-muted-foreground">
                                        {isRu ? "Периодичность" : "Periodicity"}
                                    </strong>
                                    <span>{isRu ? "2 раза в год" : "2 issues per year"}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card variant="muted" padding="md" className="space-y-4">
                        <h3 className="text-xs font-accent font-bold uppercase tracking-widest text-foreground">
                            {isRu ? "Контакты редакции" : "Editorial Contacts"}
                        </h3>

                        <div className="space-y-4 text-xs font-serif">
                            <div className="flex items-start gap-3">
                                <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-sans uppercase text-[9px] tracking-wider text-muted-foreground">Email</span>
                                    <a href="mailto:cognitivejournal@csu.ru" className="text-primary hover:underline">
                                        cognitivejournal@csu.ru
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-sans uppercase text-[9px] tracking-wider text-muted-foreground">
                                        {isRu ? "Телефон" : "Phone"}
                                    </span>
                                    <span className="text-foreground/90">+7 (351) 799-72-61</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-3 border-t border-border/60">
                                <User size={16} className="text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-sans uppercase text-[9px] tracking-wider text-muted-foreground">
                                        {isRu ? "Выпускающий редактор" : "Managing Editor"}
                                    </span>
                                    <p className="text-foreground/90 font-bold leading-tight">
                                        {isRu ? "Данилова Анастасия Анатольевна" : "Danilova Anastasia Anatolyevna"}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        {isRu ? "кандидат педагогических наук" : "PhD in Pedagogical Sciences"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
};