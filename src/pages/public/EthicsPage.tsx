import { useTranslation } from 'react-i18next';
import { Scale, HeartHandshake, ShieldAlert, Cpu, CheckSquare } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
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

            <div className="space-y-8">
                {/* 1. Этика взаимоотношений */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Этика взаимоотношений и рецензирование" : "Relationship Ethics and Reviewing"} />
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <HeartHandshake size={24} />
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                {isRu ? (
                                    "Все коммуникации редакторов журнала с рецензентами и авторами построены на взаимном уважении. Редакция предполагает, что все авторы, указанные в заявлении, согласились с содержанием рукописи, дали согласие на ее подачу в журнал, а также получили согласие от ответственных органов в организации, где выполнялась работа."
                                ) : (
                                    "All communications between the journal editors, reviewers, and authors are built on mutual respect. The editorial board assumes that all authors listed in the submission agree with the manuscript's content, have consented to its submission, and have secured approval from the responsible authorities in the organization where the research was conducted."
                                )}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 2. Конфликт интересов */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Раскрытие интересов и источников финансирования" : "Disclosure of Interests and Funding Sources"} />
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <Scale size={24} />
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                {isRu ? (
                                    "Авторы обязаны представлять информацию об источниках финансирования, финансовых или нефинансовых интересах, одобрении исследования соответствующим комитетом по этике и информированном согласии, если участниками исследования были люди. Интересы, которые должны быть представлены, включают: финансирование (источник и номер гранта), поддержку со стороны организаций, которые могут получить или потерять выгоду от публикации рукописи."
                                ) : (
                                    "Authors are required to disclose information regarding funding sources, any financial or non-financial interests, approval of the study by an appropriate ethical committee, and informed consent when human subjects are involved. Disclosable items include: funding (source and grant number) and institutional support from entities that could benefit from or experience losses due to the publication of the manuscript."
                                )}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 3. Одобрение этического комитета */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Одобрение этического комитета" : "Ethical Committee Approval"} />
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <CheckSquare size={24} />
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                {isRu ? (
                                    "При представлении отчета об исследовании, в котором участвовали люди, их данные или биологический материал, авторы должны включить заявление, подтверждающее, что исследование было одобрено соответствующим институциональным и/или национальным комитетом по исследовательской этике до начала его проведения. Заключение этического комитета удостоверяет, что исследование было проведено в соответствии с этическими стандартами, установленными в Хельсинкской декларации 1964 года."
                                ) : (
                                    "When reporting research involving human participants, their data, or biological material, authors must include a statement confirming that the study was approved by the relevant institutional and/or national research ethics committee prior to its launch. The ethical committee's decision verifies that the research was performed in compliance with the ethical standards established in the 1964 Declaration of Helsinki."
                                )}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 4. Плагиат */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Политика противодействия плагиату" : "Plagiarism Prevention Policy"} />
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <ShieldAlert size={24} />
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                {isRu ? (
                                    "Результаты должны быть представлены ясно, честно и без фальсификации или неподобающего манипулирования данными. Строго запрещается предоставлять данные, тексты или теории других авторов так, как будто они являются собственными («плагиат»). Журнал использует специализированное программное обеспечение для проверки всех поступающих рукописей на плагиат. Неэтичная практика приводит к немедленному отклонению статьи или ее отзыву после публикации."
                                ) : (
                                    "Results must be presented clearly, honestly, and without falsification or inappropriate data manipulation. Presenting other authors' data, texts, or theories as one's own ('plagiarism') is strictly prohibited. The journal employs specialized software to screen all submitted manuscripts for plagiarism. Unethical practices will lead to immediate rejection or retraction after publication."
                                )}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 5. ИИ в публикациях */}
                <section className="space-y-4">
                    <SectionHeader title={isRu ? "Политика в области искусственного интеллекта (ИИ)" : "Artificial Intelligence (AI) Policy"} />
                    <Card className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full shrink-0">
                            <Cpu size={24} />
                        </div>
                        <div className="space-y-3 font-serif text-sm leading-relaxed text-justify text-foreground/90">
                            <p>
                                <strong>{isRu ? "Для авторов:" : "For Authors:"}</strong><br />
                                {isRu ? (
                                    "Большие языковые модели (LLM), такие как ChatGPT, в настоящее время не соответствуют нашим критериям авторства. Присвоение авторства влечет за собой ответственность за рукопись, которая не может быть применена к LLM. Использование ИИ для редактирования текста (улучшения читаемости, орфографии, грамматики) не требует обязательного декларирования, однако генерация контента с помощью ИИ должна быть четко задокументирована в разделе «Методы»."
                                ) : (
                                    "Large Language Models (LLMs) like ChatGPT do not currently meet our authorship criteria. Attribution of authorship implies accountability for the manuscript, which cannot be applied to an LLM. Using AI for copyediting (improving readability, spelling, grammar) does not require declaration; however, any AI-generated content must be clearly documented in the Methods section."
                                )}
                            </p>
                            <p className="pt-2">
                                <strong>{isRu ? "Для рецензентов:" : "For Reviewers:"}</strong><br />
                                {isRu ? (
                                    "Мы просим, чтобы рецензенты не загружали рукописи в генеративные инструменты ИИ, поскольку рукописи содержат конфиденциальную информацию. Если какая-либо часть оценки рецензента поддерживалась ИИ-инструментом, рецензент обязан открыто заявить об этом в отчете."
                                ) : (
                                    "Reviewers must not upload manuscripts into generative AI systems, as they contain confidential and proprietary information. If any part of the reviewer's evaluation was assisted by an AI tool, this must be openly declared in the peer review report."
                                )}
                            </p>
                        </div>
                    </Card>
                </section>
            </div>
        </PageContainer>
    );
};