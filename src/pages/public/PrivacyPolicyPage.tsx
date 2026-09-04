import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';

export const PrivacyPolicyPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    return (
        <PageContainer spacing="md">
            <PageHeader
                title={isRu ? "Политика обработки персональных данных" : "Personal Data Processing Policy"}
                subtitle="Privacy & Data Protection"
            />

            <div className="space-y-4 font-serif text-sm leading-relaxed text-justify text-foreground/90 max-w-4xl">
                {isRu ? (
                    <>
                        <p>Редакция журнала обрабатывает персональные данные авторов, соавторов и рецензентов (фамилия, имя, отчество, место работы, контактные данные, ORCID и иные сведения, предоставляемые при подаче рукописи) исключительно в целях организации редакционно-издательского процесса: приёма и рассмотрения рукописей, проведения рецензирования, публикации и индексации статей, а также для связи с авторами по вопросам, связанным с рукописью.</p>
                        <p>Персональные данные не передаются третьим лицам, за исключением случаев, необходимых для выполнения указанных целей (например, передача данных в системы индексации и цитирования), а также случаев, предусмотренных законодательством Российской Федерации.</p>
                        <p>Подавая рукопись, автор подтверждает своё согласие на обработку персональных данных редакцией журнала в объёме, необходимом для осуществления редакционно-издательской деятельности.</p>
                        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                            Данный раздел находится в стадии наполнения. Полный текст политики обработки персональных данных будет опубликован редакцией дополнительно.
                        </p>
                    </>
                ) : (
                    <>
                        <p>The journal's editorial office processes the personal data of authors, co-authors, and reviewers (full name, place of work, contact details, ORCID, and other information provided upon manuscript submission) solely for the purposes of organizing the editorial and publishing process: receiving and reviewing manuscripts, conducting peer review, publishing and indexing articles, and communicating with authors on matters related to the manuscript.</p>
                        <p>Personal data is not disclosed to third parties, except where necessary to fulfill the purposes stated above (e.g., submission of data to indexing and citation systems), or as required by applicable law.</p>
                        <p>By submitting a manuscript, the author confirms their consent to the processing of personal data by the journal's editorial office to the extent necessary for editorial and publishing activities.</p>
                        <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                            This section is currently under development. The full text of the personal data processing policy will be published by the editorial office at a later date.
                        </p>
                    </>
                )}
            </div>
        </PageContainer>
    );
};