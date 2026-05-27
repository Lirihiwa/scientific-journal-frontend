import {useTranslation} from 'react-i18next';
import {BookOpen, FileCode, Library, ShieldAlert} from 'lucide-react';
import {PageContainer} from '../../components/ui/PageContainer';
import {PageHeader} from '../../components/ui/PageHeader';
import {Card} from '../../components/ui/Card';
import {SectionHeader} from '../../components/ui/SectionHeader';

export const GuidelinesPage = () => {
    const {i18n} = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "Информация для авторов" : "Guidelines for Authors"}
                subtitle="Submission & Formatting Standards"
            />

            <div className="space-y-8">
                {/* 1. Общие требования */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Общие требования к публикации" : "General Submission Requirements"}/>
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div
                            className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <FileCode size={24}/>
                        </div>
                        <div
                            className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90 w-full">
                            <p>
                                {isRu ? (
                                    "Журнал принимает рукописи статей двух типов: оригинальные (эмпирические) исследования и теоретические обзоры."
                                ) : (
                                    "The journal accepts manuscripts of two main types: original (empirical) research papers and theoretical reviews.")}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                                <div className="p-4 bg-muted/40 border border-border rounded-sm">
                                    <strong
                                        className="block text-[10px] font-sans uppercase tracking-wider text-primary mb-1">
                                        {isRu ? "Объем статьи" : "Manuscript Volume"}
                                    </strong>
                                    <span>
                                        {isRu ? "Ограничен 6 000 слов (без учета списка литературы, таблиц и рисунков)." : "Limited to 6,000 words (excluding reference list, tables, and figures)."}
                                    </span>
                                </div>
                                <div className="p-4 bg-muted/40 border border-border rounded-sm">
                                    <strong
                                        className="block text-[10px] font-sans uppercase tracking-wider text-primary mb-1">
                                        {isRu ? "Иллюстративный материал" : "Illustrations & Tables"}
                                    </strong>
                                    <span>
                                        {isRu ? "Рекомендуется включать не более 3-4 рисунков, 3-4 таблиц." : "We recommend including no more than 3-4 figures and 3-4 tables."}
                                    </span>
                                </div>
                                <div className="p-4 bg-muted/40 border border-border rounded-sm">
                                    <strong
                                        className="block text-[10px] font-sans uppercase tracking-wider text-primary mb-1">
                                        {isRu ? "Источники" : "Reference Limits"}
                                    </strong>
                                    <span>
                                        {isRu ? "До 60 ссылок на источники (до 150 для метаанализов и систематических обзоров)." : "Up to 60 references (up to 150 for meta-analyses and systematic reviews)."}
                                    </span>
                                </div>
                                <div className="p-4 bg-muted/40 border border-border rounded-sm">
                                    <strong
                                        className="block text-[10px] font-sans uppercase tracking-wider text-primary mb-1">
                                        {isRu ? "Аннотация" : "Abstract length"}
                                    </strong>
                                    <span>
                                        {isRu ? "От 150 до 250 слов, 4-6 ключевых слов." : "From 150 to 250 words, along with 4-6 keywords."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* 2. Анонимизация */}
                <section className="space-y-4">
                    <SectionHeader
                        title={isRu ? "Слепое рецензирование и анонимизация" : "Double-Blind Review and Anonymization"}/>
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div
                            className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <ShieldAlert size={24}/>
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                {isRu ? (
                                    "Все статьи проходят двойное слепое экспертное рецензирование, то есть автор остается анонимным для рецензентов на протяжении всего процесса оценки. Поэтому имена авторов, сведения об организации и любая другая потенциально идентифицирующая информация должны быть полностью удалены из текста рукописи и сопутствующих файлов."
                                ) : (
                                    "All articles undergo double-blind peer review, meaning the author remains anonymous to the reviewers throughout the entire evaluation process. Therefore, authors' names, affiliations, and any other potentially identifying information must be completely removed from the text of the manuscript and accompanying files.")}
                            </p>
                            <p>
                                {isRu ? (
                                    "При отправке статьи на рассмотрение авторы прикрепляют отдельную титульную страницу, содержащую название работы, имена авторов, принадлежность к организации и контактные данные."
                                ) : (
                                    "During submission, authors must attach a separate title page containing the title of the work, authors' names, institutional affiliations, and contact information.")}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 3. Форматирование */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Технические требования к файлу" : "Technical File Requirements"}/>
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div
                            className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <Library size={24}/>
                        </div>
                        <div
                            className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90 w-full">
                            <ul className="space-y-2">
                                <li className="flex gap-2">
                                    <span className="text-primary font-sans">•</span>
                                    <span><strong>{isRu ? "Формат:" : "Format:"}</strong> Microsoft Word (DOCX / DOC).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-sans">•</span>
                                    <span><strong>{isRu ? "Шрифт:" : "Font:"}</strong> Times New Roman, 12pt.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-sans">•</span>
                                    <span><strong>"Интервал:"</strong> {isRu ? "Полуторный (1.5), выравнивание по ширине." : "1.5 line spacing, justified."}</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-sans">•</span>
                                    <span><strong>{isRu ? "Уравнения:" : "Equations:"}</strong> {isRu ? "Редактор формул Microsoft Word или MathType." : "Microsoft Word Equation Editor or MathType."}</span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </section>

                {/* 4. Оформление списка литературы */}
                <section className="space-y-4">
                    <SectionHeader
                        title={isRu ? "Оформление списка литературы (APA 7)" : "Reference List Styling (APA 7)"}/>
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div
                            className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <BookOpen size={24}/>
                        </div>
                        <div className="space-y-4 font-serif text-xs leading-relaxed text-foreground/90 w-full">
                            <p className="text-sm">
                                {isRu ? (
                                    "Список литературы составляется в алфавитном порядке по фамилии первого автора и оформляется в соответствии со стандартом APA 7. Наличие DOI обязательно для всех источников, у которых он имеется."
                                ) : (
                                    "The reference list is arranged alphabetically by the surname of the first author and must strictly adhere to the APA 7 standard. DOIs must be provided for all sources where available.")}
                                <a href="https://findmedianow.com/away10.php?asin=1433832151" target="_blank"
                                   rel="noreferrer" className="text-primary hover:underline ml-1 block mt-1">
                                    Publication Manual of the APA (7th edition)
                                </a>
                            </p>

                            <div className="space-y-3 pt-3 border-t border-border">
                                <div>
                                    <strong
                                        className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">{isRu ? "Статья в журнале" : "Journal Article"}</strong>
                                    <p className="font-mono bg-muted/30 p-2 border border-border/60 rounded-sm">
                                        Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J. (2019). Emotions in
                                        storybooks: A comparison of storybooks that represent ethnic and racial groups
                                        in the United States. <i>Psychology of Popular Media Culture</i>, 8(3), 207–217.
                                        https://doi.org/10.1037/ppm0000185
                                    </p>
                                </div>
                                <div>
                                    <strong
                                        className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">{isRu ? "Книга (монография)" : "Book / Monograph"}</strong>
                                    <p className="font-mono bg-muted/30 p-2 border border-border/60 rounded-sm">
                                        Sapolsky, R. M. (2017). <i>Behave: The biology of humans at our best and
                                        worst</i>. Penguin Books.
                                    </p>
                                </div>
                                <div>
                                    <strong
                                        className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">{isRu ? "Глава в книге" : "Book Chapter"}</strong>
                                    <p className="font-mono bg-muted/30 p-2 border border-border/60 rounded-sm">
                                        Dillard, J. P. (2020). Currents in the study of persuasion. In M. B. Oliver, A.
                                        A. Raney, & J. Bryant (Eds.), <i>Media effects: Advances in theory and
                                        research</i> (4th ed., pp. 115–129). Routledge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </PageContainer>
    );
};