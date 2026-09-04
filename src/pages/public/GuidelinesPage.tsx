import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const GuidelinesPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "Общие требования к публикации" : "General Submission Requirements"}
                subtitle="Submission & Formatting Standards"
            />

            <div className="space-y-10 font-serif text-sm leading-relaxed text-justify text-foreground/90 max-w-4xl">

                {/* 1. Общие требования к публикации */}
                <section className="space-y-4">
                    {isRu ? (
                        <>
                            <p>Журнал принимает рукописи статей двух типов: оригинальные (эмпирические) исследования и теоретические обзоры.</p>
                            <p>Объем статьи ограничен 6 000 слов, не включая список литературы, таблицы и рисунки. Рекомендуется включать не более 3-4 рисунков, 3-4 таблиц и до 60 ссылок на источники.</p>
                            <p>Аннотация должна составлять от 150 до 250 слов, 4-6 ключевых слов. В аннотации не должно содержаться неопределенных сокращений или ссылок. В аннотации должны быть кратко представлены актуальность и цель исследования, методы, выборка, результаты и обсуждение.</p>
                            <p>Для авторов, которые проводят систематический обзор, библиометрический анализ или метаанализ, список литературы может быть расширен до 150 источников.</p>
                            <p>
                                Журнал следует рекомендациям издания 2020 Publication Manual of the American Psychological Association (7-е издание), и авторам рекомендуется ссылаться на это издание для стиля и пунктуации ссылок.{' '}
                                <a
                                    href="https://findmedianow.com/away10.php?asin=1433832151"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Publication Manual of the APA (7th edition)
                                </a>
                            </p>
							<br></br>
							<p>Все статьи проходят <strong>двойное слепое экспертное рецензирование</strong>, то есть автор остается анонимным для рецензентов на протяжении всего процесса оценки. Поэтому имена авторов, связи и любая другая потенциально идентифицирующая информация должны быть удалены из текста рукописи и любых сопутствующих файлов. При этом должна быть отправлена отдельная титульная страница, содержащая название, имена авторов, принадлежность и контактную информацию корреспондирующего автора. Авторам следует избегать цитирования своих собственных работ таким образом, чтобы это могло раскрыть их личность. Ответственность за анонимизацию рукописи и любых связанных материалов лежит на авторе.</p>
							<br></br>
							<p>Титульная страница должна включать следующие заявления (см. подробнее «Этика и политика журнала»):</p>
							<ul className="list-disc pl-6 space-y-1">
								<li>вклад каждого автора в создание рукописи;</li>
								<li>информация об источниках финансирования;</li>
								<li>информация о возможном конфликте интересов;</li>
								<li>информация об одобрении исследования комитетом по этике;</li>
								<li>информация об информированном согласии участников.</li>
							</ul>
							<br></br>
							<p>Рукописи должны быть представлены в формате <strong>Word, шрифт 12 Times Roman, 1,5 интервал</strong>. Рекомендуется использовать курсив для выделения, функцию автоматической нумерации страниц, функцию таблиц, а не электронные таблицы, редактор уравнений или MathType для уравнений. Файлы необходимо сохранять в формате docx (Word 2007 или выше) или в формате doc (старые версии Word).</p>
                            <br></br>
							<p><strong>Аббревиатуры</strong> должны определяться при первом упоминании и использоваться последовательно в дальнейшем.</p>
                        </>
                    ) : (
                        <>
                            <p>The journal accepts manuscripts of two types: original (empirical) research papers and theoretical reviews.</p>
                            <p>Manuscript length is limited to 6,000 words, excluding the reference list, tables, and figures. We recommend including no more than 3-4 figures, 3-4 tables, and up to 60 references.</p>
                            <p>The abstract should be between 150 and 250 words, along with 4-6 keywords. The abstract should not contain undefined abbreviations or citations. It should briefly present the relevance and purpose of the study, methods, sample, results, and discussion.</p>
                            <p>For authors conducting a systematic review, bibliometric analysis, or meta-analysis, the reference list may be extended up to 150 sources.</p>
                            <p>
                                The journal follows the recommendations of the 2020 Publication Manual of the American Psychological Association (7th edition), and authors are encouraged to consult it for reference style and punctuation.{' '}
                                <a
                                    href="https://findmedianow.com/away10.php?asin=1433832151"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Publication Manual of the APA (7th edition)
                                </a>
                            </p>
							<br></br>
                            <p>All articles undergo <strong>double-blind peer review</strong>, meaning the author remains anonymous to reviewers throughout the entire evaluation process. Therefore, authors' names, affiliations, and any other potentially identifying information must be removed from the manuscript text and any accompanying files. A separate title page must be submitted, containing the title, authors' names, affiliations, and the corresponding author's contact information. Authors should avoid citing their own work in a way that could reveal their identity. Responsibility for anonymizing the manuscript and any related materials lies with the author.</p>
							<br></br>
							<p>The title page must include the following statements (see "Ethics and Policy of the Journal" for details):</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>each author's contribution to the manuscript;</li>
                                <li>information on funding sources;</li>
                                <li>information on potential conflicts of interest;</li>
                                <li>information on ethics committee approval of the study;</li>
                                <li>information on participants' informed consent.</li>
                            </ul>
							<br></br>
							<p>Manuscripts must be submitted in <strong>Word format, 12pt Times New Roman font, 1.5 line spacing</strong>. We recommend using italics for emphasis, the automatic page numbering function, the table function rather than spreadsheets, and the Equation Editor or MathType for equations. Files must be saved in docx (Word 2007 or later) or doc (older Word versions) format.</p>
                            <br></br>
							<p><strong>Abbreviations</strong> must be defined at first mention and used consistently thereafter.</p>
						</>
                    )}
                </section>

                {/* 2. Оформление списка литературы */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Оформление списка литературы" : "Reference List Formatting"} />
                    {isRu ? (
                        <>
                            <p>Цитирование оформляется в тексте по фамилии автора и году выхода работы в круглых скобках. Например: «Этот эффект был широко изучен (Эбботт, 1991; Баракат и др., 1995; Келсо и Смит, 1998; Medvec и др., 1999)».</p>
                            <p>Список литературы должен включать только источники, которые упоминаются в тексте и которые были опубликованы / приняты для публикации. Ссылки в перечне литературы должны быть приведены в алфавитном порядке по фамилии первого автора.</p>
                            <p>Имена журналов и названия книг должны быть курсивом. Если статья имеет DOI, необходимо добавлять его как полную ссылку в список литературы (например, «https://doi.org/abc»).</p>

                            <div className="space-y-3 pt-3 border-t border-border">
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Статья</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J. (2019). Emotions in
                                        storybooks: A comparison of storybooks that represent ethnic and racial groups
                                        in the United States. <i>Psychology of Popular Media Culture</i>, 8(3), 207–217.
                                        https://doi.org/10.1037/ppm0000185
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Монография</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Sapolsky, R. M. (2017). <i>Behave: The biology of humans at our best and
                                        worst</i>. Penguin Books.
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Глава в книге</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Dillard, J. P. (2020). Currents in the study of persuasion. In M. B. Oliver, A.
                                        A. Raney, & J. Bryant (Eds.), <i>Media effects: Advances in theory and
                                        research</i> (4th ed., pp. 115–129). Routledge.
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Онлайн документ</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Fagan, J. (2019, March 25). Nursing clinical brain. <i>OER Commons</i>. Retrieved
                                        January 7, 2020, from https://www.oercommons.org/authoring/53029-nursing-clinical-brain/view
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>In-text citations are formatted by the author's surname and the year of publication in parentheses. For example: "This effect has been widely studied (Abbott, 1991; Barakat et al., 1995; Kelso & Smith, 1998; Medvec et al., 1999)."</p>
                            <p>The reference list must include only sources that are cited in the text and that have been published or accepted for publication. References must be listed alphabetically by the first author's surname.</p>
                            <p>Journal names and book titles must be italicized. If an article has a DOI, it must be added as a full link in the reference list (e.g., "https://doi.org/abc").</p>

                            <div className="space-y-3 pt-3 border-t border-border">
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Journal Article</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J. (2019). Emotions in
                                        storybooks: A comparison of storybooks that represent ethnic and racial groups
                                        in the United States. <i>Psychology of Popular Media Culture</i>, 8(3), 207–217.
                                        https://doi.org/10.1037/ppm0000185
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Book / Monograph</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Sapolsky, R. M. (2017). <i>Behave: The biology of humans at our best and
                                        worst</i>. Penguin Books.
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Book Chapter</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Dillard, J. P. (2020). Currents in the study of persuasion. In M. B. Oliver, A.
                                        A. Raney, & J. Bryant (Eds.), <i>Media effects: Advances in theory and
                                        research</i> (4th ed., pp. 115–129). Routledge.
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-sans text-[10px] uppercase text-muted-foreground mb-1">Online Document</span>
                                    <p className="font-mono text-xs bg-muted/30 p-3 border border-border/60 rounded-sm">
                                        Fagan, J. (2019, March 25). Nursing clinical brain. <i>OER Commons</i>. Retrieved
                                        January 7, 2020, from https://www.oercommons.org/authoring/53029-nursing-clinical-brain/view
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* 3. Таблицы */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Таблицы" : "Tables"} />
                    {isRu ? (
                        <>
                            <p>Все таблицы должны быть пронумерованы арабскими цифрами и приводиться в тексте в последовательном числовом порядке. У каждой таблицы должно быть название, объясняющее ее содержание. Если таблица была опубликована ранее, необходимо указать источник в виде ссылки в конце названия таблицы. Примечания к таблице должны помещаться внизу таблицы.</p>
                        </>
                    ) : (
                        <>
                            <p>All tables must be numbered with Arabic numerals and presented in the text in sequential numerical order. Each table must have a title explaining its content. If a table has been previously published, the source must be indicated as a reference at the end of the table title. Table notes should be placed at the bottom of the table.</p>
                        </>
                    )}
                </section>

				{/* 4. Рисунки */}
				<section className="space-y-4">
					<SectionHeader title={isRu ? "Рисунки" : "Figures"} />
					{isRu ? (
						<>
							<p>Все рисунки в статье должны иметь названия, отражающие их содержание, и номер по порядку (например, Рис.1 / Fig.1). Название рисунка располагается под ним.</p>
                            <br></br>
							<p>Авторам необходимо ознакомиться с политикой и этическими принципами журнала («Этика и политика») и придерживаться их.</p>
						</>
					) : (
						<>
							<p>All figures in the article must have titles reflecting their content and a sequential number (e.g., Fig.1). The figure title is placed below the figure.</p>
                            <br></br>
                            <p>Authors should familiarize themselves with the journal's policy and ethical principles ("Ethics and Policy") and adhere to them.</p>
						</>
					)}
				</section>

            </div>
        </PageContainer>
    );
};