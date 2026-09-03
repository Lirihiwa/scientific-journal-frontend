import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const EthicsPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "Этика и политика журнала" : "Ethics and Policy"}
                subtitle="Academic Integrity Standards"
            />

            <div className="space-y-10 font-serif text-sm leading-relaxed text-justify text-foreground/90 max-w-4xl">

                {/* 1. Этика взаимоотношений */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Этика взаимоотношений" : "Relationship Ethics"} />
                    {isRu ? (
                        <>
                            <p>Все коммуникации редакторов журнала с рецензентами и авторами построены на взаимном уважении.</p>
                            <p>Редакция предполагает, что все авторы, указанные в заявлении, согласились с содержанием рукописи, дали согласие на ее подачу в журнал, а также получили согласие от ответственных органов в организации, где выполнялась работа.</p>
                            <p>Авторы обязаны включать в рукопись <strong>заявление об ответственности</strong>, которое определяет <strong>вклад каждого автора</strong> в создание рукописи (например, концепция и дизайн, получение, анализ или интерпретацию данных и т.д.).</p>
                            <p>Авторы представляют <strong>информацию об источниках финансирования, финансовых или нефинансовых интересах, одобрении исследования соответствующим комитетом по этике и информированном согласии</strong>, если участниками исследования были люди.</p>
                            <br></br>
							<p>Интересы, которые должны быть представлены, могут включать: финансирование (указать источник финансирования и номер гранта); поддержка исследований организациями, которые могут получить или потерять финансовую выгоду от публикации этой рукописи и т.д. Нефинансовые интересы, которые могут повлиять на работу, включают профессиональные интересы, личные отношения или личные убеждения (например, должность в редакционном совете, написание и/или консультирование в образовательных целях, эксперт).</p>
                            <br></br>
							<p>При представлении отчёта об исследовании, в котором участвовали люди, их данные или биологический материал, авторы должны включить заявление, подтверждающее, что <strong>исследование было одобрено</strong> (или предоставлено исключение) соответствующим институциональным и/или национальным <strong>комитетом по исследовательской этике</strong> (включая название комитета по этике) <strong>до начала его проведения</strong>. Заключение этического комитета удостоверяет, что исследование было проведено в соответствии с этическими стандартами, установленными в Хельсинкской декларации 1964 года и ее последующих поправках или сопоставимыми этическими стандартами.</p>
							<p>В случае нескольких авторов один из них назначается <strong>корреспондирующим автором</strong> и действует от имени всех соавторов, обеспечивая решение вопросов, связанных с точностью или целостностью текста статьи. Например, он обеспечивает, чтобы все авторы одобрили рукопись до подачи, включая имена и порядок авторов, управляет всей коммуникацией между журналом и всеми соавторами до и после публикации статьи.</p>
                            <p>Аффилирующей организацией для каждого автора должно быть учреждение основного места его работы. Любые изменения в списке авторов (порядок авторов, добавление или удаление авторов, изменения в аффилиации и др.) не допускаются после принятия рукописи.</p>
                            <p>Авторам настоятельно рекомендуется использовать свой ORCID ID при отправке статьи на рассмотрение.</p>
                            <br></br>
							<p>Авторам следует рассматривать все коммуникации с журналом как конфиденциальные, если не получено прямого согласия на открытие информации.</p>
							<p>В случае спора об авторстве в процессе рецензирования или после принятия и публикации журнал не сможет провести расследование. Авторам будет предложено самостоятельно разрешить спор. При отсутствии такой возможности журнал оставляет за собой право отозвать рукопись из редакционного процесса или, в случае опубликования статьи, обратиться к учреждению(ям) авторов.</p>
                            <br></br>
							<p>Рукопись не должна быть представлена для одновременного рассмотрения более чем в одном издании. Представленная работа должна быть оригинальной и не должна публиковаться в какой-либо другой форме или на каком-либо другом языке (частично или полностью), если только новая работа не касается расширения предыдущего исследования.</p>
						</>
                    ) : (
                        <>
                            <p>All communications between the journal editors, reviewers, and authors are built on mutual respect.</p>
                            <p>The editorial board assumes that all authors listed in the submission agree with the manuscript's content, have consented to its submission, and have secured approval from the responsible authorities in the organization where the research was conducted.</p>
                            <p>Authors are required to include <strong>an accountability statement</strong> in the manuscript, defining <strong>each author's contribution</strong> to its creation (e.g., concept and design, data acquisition, analysis or interpretation, etc.).</p>
                            <p>Authors must disclose <strong>information regarding funding sources, any financial or non-financial interests, approval of the study by an appropriate ethics committee, and informed consent</strong> when human participants are involved.</p>
                            <br></br>
							<p>Disclosable interests may include: funding (source and grant number); institutional support from entities that could gain or lose financially from the publication of the manuscript. Non-financial interests that may affect the work include professional interests, personal relationships, or personal beliefs (e.g., a position on an editorial board, teaching or consulting roles, expert status).</p>
							<br></br>
							<p>When reporting research involving human participants, their data, or biological material, authors must include a statement confirming that <strong>the study was approved</strong> (or granted an exemption) by the relevant institutional and/or national <strong>research ethics committee</strong> (including the committee's name) <strong>prior to its commencement</strong>. The ethics committee's approval verifies that the research was conducted in accordance with the ethical standards set out in the 1964 Declaration of Helsinki and its later amendments, or comparable ethical standards.</p>
							<p>In the case of multiple authors, one is designated as the <strong>corresponding author</strong> and acts on behalf of all co-authors, ensuring resolution of matters related to the accuracy or integrity of the article's text. For example, they ensure that all authors have approved the manuscript prior to submission, including author names and order, and manage all communication between the journal and all co-authors before and after publication.</p>
                            <p>Each author's affiliation must be the institution of their primary place of work. Any changes to the author list (order, addition or removal of authors, changes in affiliation, etc.) are not permitted after the manuscript has been accepted.</p>
                            <p>Authors are strongly encouraged to use their ORCID iD when submitting a manuscript for review.</p>
                            <br></br>
							<p>Authors should treat all communications with the journal as confidential unless explicit consent has been given to disclose the information.</p>
                            <p>In the event of an authorship dispute during peer review or after acceptance and publication, the journal will be unable to investigate. Authors will be asked to resolve the dispute themselves. If this is not possible, the journal reserves the right to withdraw the manuscript from the editorial process or, if the article has been published, to contact the authors' institution(s).</p>
                            <br></br>
							<p>A manuscript must not be submitted for simultaneous consideration by more than one publication. The submitted work must be original and must not be published in any other form or language (in part or in full), unless the new work constitutes an extension of previous research.</p>
						</>
                    )}
                </section>

                {/* 2. Плагиат */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Плагиат" : "Plagiarism"} />
                    {isRu ? (
                        <>
                            <p>Результаты должны быть представлены ясно, честно и без фальсификации или неподобающего манипулирования данными. Авторы должны соблюдать этические требования по сбору, отбору и обработке данных. Строго запрещается предоставлять данные, тексты или теории других авторов так, как будто они являются собственными («плагиат»). Необходимо предоставлять точные ссылки на все заимствованные материалы, которые скопированы (почти дословно) или перефразированы. Для дословного воспроизведения материалов используются кавычки. Журнал может использовать программное обеспечение для проверки рукописи на плагиат.</p>
                            <p>Авторы несут ответственность за документирование соответствующих цитат для обоснования своей работы. Неэтичная практика в создании цитат рукописей является нарушением политики журнала, приводит к отклонению рукописи или отзыву после публикации, а также доводится до сведения учреждений авторов.</p>
                            <br></br>
							<p>Не рекомендуются и не поощряются чрезмерное и неуместное самоцитирование или скоординированные усилия нескольких авторов по коллективному самоцитированию.</p>
                            <br></br>
							<p>При необходимости авторы должны быть готовы отправить соответствующие документы или данные для проверки достоверности представленных результатов. Это могут быть таблицы исходных данных, выборки, записи и т.д., при этом конфиденциальность данных не должна быть нарушена.</p>
                        </>
                    ) : (
                        <>
                            <p>Results must be presented clearly, honestly, and without falsification or inappropriate data manipulation. Authors must comply with ethical requirements for data collection, selection, and processing. Presenting other authors' data, texts, or theories as one's own ("plagiarism") is strictly prohibited. Accurate references must be provided for all borrowed material that is copied (almost verbatim) or paraphrased. Quotation marks must be used for verbatim reproduction of material. The journal may use software to screen manuscripts for plagiarism.</p>
                            <p>Authors are responsible for documenting appropriate citations to support their work. Unethical citation practices violate the journal's policy and will lead to manuscript rejection or retraction after publication, and will be reported to the authors' institutions.</p>
                            <br></br>
							<p>Excessive and inappropriate self-citation, or coordinated efforts by multiple authors toward collective self-citation, are discouraged.</p>
                            <br></br>
							<p>If required, authors must be prepared to provide relevant documents or data to verify the accuracy of the reported results. This may include raw data tables, samples, records, etc., while data confidentiality must not be compromised.</p>
                        </>
                    )}
                </section>

                {/* 3. Политика в области ИИ */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Политика в области искусственного интеллекта (ИИ)" : "Artificial Intelligence (AI) Policy"} />
                    {isRu ? (
                        <>
                            <p>Большие языковые модели (LLM), такие как ChatGPT, в настоящее время не соответствуют нашим критериям авторства. В частности, присвоение авторства влечет за собой ответственность за рукопись, которая не может быть применена к LLM. Использование LLM должно быть должным образом задокументировано в разделе «Методы». Использование LLM (или другого средства искусственного интеллекта) для целей «редактирования с помощью ИИ» (усовершенствование человеческих текстов для удобочитаемости и стиля, отсутствия ошибок в грамматике, орфографии, пунктуации) не требует декларирования. Эти усовершенствования с помощью ИИ могут включать изменения в формулировке и форматировании текстов, но не включают генеративную редакционную работу и автономное создание контента. Во всех случаях должна быть обеспечена <strong>персональная авторская ответственность</strong> за окончательный вариант текста и согласие со стороны авторов о том, что редактирование отражает их оригинальную работу.</p>
                            <p>Поскольку мы ожидаем быстрого развития событий в этой области в ближайшем будущем, мы будем регулярно пересматривать эту политику и при необходимости корректировать ее.</p>
                            
                        </>
                    ) : (
                        <>
                            <p>Large Language Models (LLMs) such as ChatGPT do not currently meet our authorship criteria. In particular, attribution of authorship implies accountability for the manuscript, which cannot be applied to an LLM. Use of an LLM must be properly documented in the Methods section. Using an LLM (or another AI tool) for "AI-assisted copyediting" purposes (improving human-written text for readability and style, and correcting grammar, spelling, and punctuation errors) does not require declaration. Such AI-assisted improvements may include changes to wording and formatting but do not include generative editorial work or autonomous content creation. In all cases, <strong>personal authorial responsibility</strong> for the final text and the authors' confirmation that the editing reflects their original work must be ensured.</p>
                            <p>As we expect rapid developments in this area in the near future, we will regularly review this policy and adjust it as necessary.</p>
                            
                        </>
                    )}
                </section>

				{/* 4. Этика в отношении рецензирования */}
				<section>
					<SectionHeader title={isRu ? "Этика в отношении рецензирования" : "Ethics of Peer Review"} />
					{isRu ? (
						<>
							<p>Рецензенты играют важную роль в процессе научных публикаций. Редакторы выбирают рецензентов в первую очередь из-за их глубоких знаний по предмету или методам работы, которую им предлагается оценить. Рецензенты несут ответственность за точность оценок, отраженных в их отчетах, а процесс рецензирования коллег функционирует на основе принципа взаимного доверия между авторами, рецензентами и редакторами. Несмотря на быстрый прогресс, инструменты генеративного искусственного интеллекта имеют значительные ограничения: они могут не обладать современными знаниями и могут производить бессмысленную, предвзятую или ложную информацию. Рукописи могут также содержать конфиденциальную или запатентованную информацию, которая не должна открываться за пределами процесса экспертной оценки. По этим причинам мы просим, чтобы рецензенты не загружали рукописи в генеративные инструменты ИИ.</p>
                            <p>Если какая-либо часть оценки утверждений, сделанных в рукописи, каким-либо образом поддерживалась ИИ-инструментом, мы просим рецензентов открыто заявлять об использовании таких инструментов в отчете о рецензировании.</p>
						</>
					) : (
						<>
							<p>Reviewers play an essential role in the scholarly publishing process. Editors select reviewers primarily for their in-depth knowledge of the subject matter or methods of the work they are asked to evaluate. Reviewers are responsible for the accuracy of the assessments reflected in their reports, and the peer review process operates on a principle of mutual trust between authors, reviewers, and editors. Despite rapid progress, generative AI tools have significant limitations: they may lack up-to-date knowledge and may produce nonsensical, biased, or false information. Manuscripts may also contain confidential or proprietary information that must not be disclosed outside the peer review process. For these reasons, we ask that reviewers not upload manuscripts into generative AI tools.</p>
                            <p>If any part of the evaluation of claims made in a manuscript was in any way supported by an AI tool, we ask reviewers to openly disclose the use of such tools in their review report.</p>
						</>
					)}
				</section>

                {/* 5. Этика в отношении государства и общества */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Этика в отношении государства и общества" : "Ethics Toward State and Society"} />
                    {isRu ? (
                        <p>Исследователи должны соблюдать требования своих учреждений и финансирующих организаций, а также любые национальные правила. Они должны быть осведомлены о проблемах двойного использования, связанных с их работой, и принимать меры для минимизации злоупотребления своими исследованиями. Мы считаем, что открытость в науке помогает предупреждать общество о потенциальных угрозах и защищать его от них, и ожидаем, что очень редко риски будут перевешивать выгоды от публикации статьи, которая в противном случае будет отклонена.</p>
                    ) : (
                        <p>Researchers must comply with the requirements of their institutions and funding organizations, as well as any national regulations. They should be aware of dual-use concerns related to their work and take steps to minimize the potential misuse of their research. We believe that openness in science helps warn society of potential threats and protect it from them, and we expect that only in very rare cases will the risks outweigh the benefits of publishing an article that would otherwise be rejected.</p>
                    )}
                </section>

            </div>
        </PageContainer>
    );
};