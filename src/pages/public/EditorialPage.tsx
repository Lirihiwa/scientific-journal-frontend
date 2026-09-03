import { useTranslation } from 'react-i18next';
import { UserCheck, Users, GraduationCap, MapPin } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const EditorialPage = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const editorInChief = {
        nameRu: "Косоногов Владимир Владимирович",
        nameEn: "Kosonogov Vladimir Vladimirovich",
        degreeRu: "доктор биологических наук",
        degreeEn: "Doctor of Biological Sciences",
        orgRu: "НИУ ВШЭ",
        orgEn: "HSE University",
        cityRu: "Санкт-Петербург",
        cityEn: "Saint Petersburg",
        countryRu: "Российская Федерация",
        countryEn: "Russian Federation",
        orcid: "0000-0002-0469-4818",
        photoUrl: "" // вставьте ссылку на фото сюда, например: "https://example.com/photo.jpg"
    };

    const editorialCommittee = [
        {
            nameRu: "Волкова Елена Вениаминовна",
            nameEn: "Volkova Elena Veniaminovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Институт психологии Российской академии наук",
            orgEn: "Institute of Psychology of the Russian Academy of Sciences",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-3809-3639",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Карпов Анатолий Викторович",
            nameEn: "Karpov Anatoly Viktorovich",
            degreeRu: "доктор психологических наук, член-корреспондент РАН",
            degreeEn: "Doctor of Psychology, Corresponding Member of the Russian Academy of Sciences",
            orgRu: "Ярославский государственный университет им. П. Г. Демидова",
            orgEn: "P.G. Demidov Yaroslavl State University",
            cityRu: "Ярославль",
            cityEn: "Yaroslavl",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-4547-2848",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Коровкин Сергей Юрьевич",
            nameEn: "Korovkin Sergey Yuryevich",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Ярославский государственный университет им. П. Г. Демидова, Институт психологии Российской академии наук",
            orgEn: "P.G. Demidov Yaroslavl State University, Institute of Psychology of the Russian Academy of Sciences",
            cityRu: "Ярославль",
            cityEn: "Yaroslavl",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0001-7890-4366",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Ермаков Павел Николаевич",
            nameEn: "Ermakov Pavel Nikolaevich",
            degreeRu: "доктор биологических наук, академик РАО",
            degreeEn: "Doctor of Biological Sciences, Academician of the Russian Academy of Education",
            orgRu: "Южный федеральный университет",
            orgEn: "Southern Federal University",
            cityRu: "Ростов-на-Дону",
            cityEn: "Rostov-on-Don",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0001-8395-2426",
            photoUrl: "" // вставьте ссылку на фото
        }
    ];

    const boardMembers = [
        {
            nameRu: "Абакумова Ирина Владимировна",
            nameEn: "Abakumova Irina Vladimirovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Донской государственный технический университет",
            orgEn: "Don State Technical University",
            cityRu: "Ростов-на-Дону",
            cityEn: "Rostov-on-Don",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-2202-2588",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Воробьева Елена Викторовна",
            nameEn: "Vorobyeva Elena Viktorovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Южный федеральный университет",
            orgEn: "Southern Federal University",
            cityRu: "Ростов-на-Дону",
            cityEn: "Rostov-on-Don",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0001-8974-5655",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Девятерикова Алена Андреевна",
            nameEn: "Devyaterikova Alena Andreevna",
            degreeRu: "кандидат психологических наук",
            degreeEn: "PhD in Psychology",
            orgRu: "Российский университет дружбы народов им. Патриса Лумумбы",
            orgEn: "Patrice Lumumba Peoples' Friendship University of Russia",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-7666-1089",
            photoUrl: "" // вставьте ссылку на фото
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
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0001-8224-2190",
            photoUrl: "" // вставьте ссылку на фото
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
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-0240-8176",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Копцева Наталья Петровна",
            nameEn: "Koptseva Natalya Petrovna",
            degreeRu: "доктор философских наук",
            degreeEn: "Doctor of Philosophy",
            orgRu: "Сибирский федеральный университет",
            orgEn: "Siberian Federal University",
            cityRu: "Красноярск",
            cityEn: "Krasnoyarsk",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-3910-7991",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Маракшина Юлия Александровна",
            nameEn: "Marakshina Yulia Aleksandrovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Российская академия образования",
            orgEn: "Russian Academy of Education",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-7559-9148",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Нестик Тимофей Александрович",
            nameEn: "Nestik Timofey Aleksandrovich",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Институт психологии Российской академии наук",
            orgEn: "Institute of Psychology of the Russian Academy of Sciences",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-1410-4762",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Парфенов Владимир Анатольевич",
            nameEn: "Parfenov Vladimir Anatolyevich",
            degreeRu: "доктор медицинских наук",
            degreeEn: "Doctor of Medical Sciences",
            orgRu: "Первый Московский государственный медицинский университет им. И.М. Сеченова",
            orgEn: "I.M. Sechenov First Moscow State Medical University",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-1992-7960",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Тихомирова Татьяна Николаевна",
            nameEn: "Tikhomirova Tatyana Nikolaevna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Российская академия образования",
            orgEn: "Russian Academy of Education",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-6748-763X",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Фомина Татьяна Геннадьевна",
            nameEn: "Fomina Tatyana Gennadievna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Российская академия образования",
            orgEn: "Russian Academy of Education",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0001-5097-4733",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Холодная Марина Александровна",
            nameEn: "Kholodnaya Marina Aleksandrovna",
            degreeRu: "доктор психологических наук",
            degreeEn: "Doctor of Psychology",
            orgRu: "Институт психологии Российской академии наук",
            orgEn: "Institute of Psychology of the Russian Academy of Sciences",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-4267-317X",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Храмов Александр Евгеньевич",
            nameEn: "Khramov Alexander Evgenievich",
            degreeRu: "доктор физико-математических наук",
            degreeEn: "Doctor of Physical and Mathematical Sciences",
            orgRu: "Российский экономический университет им. Г.В. Плеханова",
            orgEn: "Plekhanov Russian University of Economics",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0003-2787-2530",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Юров Иван Юрьевич",
            nameEn: "Yurov Ivan Yuryevich",
            degreeRu: "доктор биологических наук",
            degreeEn: "Doctor of Biological Sciences",
            orgRu: "Московский государственный психолого-педагогический университет",
            orgEn: "Moscow State University of Psychology and Education",
            cityRu: "Москва",
            cityEn: "Moscow",
            countryRu: "Российская Федерация",
            countryEn: "Russian Federation",
            orcid: "0000-0002-4134-8367",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Зай-Фу Яо",
            nameEn: "Tsai-Fu Yao",
            degreeRu: "доктор философских наук",
            degreeEn: "PhD",
            orgRu: "Исследовательский университет в Синьчжу",
            orgEn: "Research University of Hsinchu",
            cityRu: "Синьчжу",
            cityEn: "Hsinchu",
            countryRu: "Тайвань",
            countryEn: "Taiwan",
            orcid: "0000-0002-9823-9110",
            photoUrl: "" // вставьте ссылку на фото
        },
        {
            nameRu: "Манодж Кумар Маллик",
            nameEn: "Manoj Kumar Mallik",
            degreeRu: "доктор философских наук",
            degreeEn: "PhD",
            orgRu: "Исследовательский институт в Бхубанешваре",
            orgEn: "Research Institute of Bhubaneswar",
            cityRu: "Бхубанешвар",
            cityEn: "Bhubaneswar",
            countryRu: "Индия",
            countryEn: "India",
            orcid: "0000-0002-3193-1727",
            photoUrl: "" // вставьте ссылку на фото
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
                <Card variant="accent" padding="none" className="flex flex-col md:flex-row items-stretch gap-0 overflow-hidden">
                    {editorInChief.photoUrl ? (
                        <img
                            src={editorInChief.photoUrl}
                            alt={isRu ? editorInChief.nameRu : editorInChief.nameEn}
                            className="w-full md:w-40 h-48 md:h-auto object-cover shrink-0"
                        />
                    ) : (
                        <div className="w-full md:w-40 h-48 md:h-auto bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <UserCheck size={40} />
                        </div>
                    )}
                    <div className="space-y-2 font-serif p-6 md:p-8">
                        <h3 className="text-2xl font-sans font-bold text-foreground">
                            {isRu ? editorInChief.nameRu : editorInChief.nameEn}
                        </h3>
                        <p className="text-primary font-accent uppercase tracking-tight text-[11px]">
                            {isRu ? editorInChief.degreeRu : editorInChief.degreeEn}
                        </p>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            {isRu ? editorInChief.orgRu : editorInChief.orgEn}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <MapPin size={13} className="text-primary/70" />
                            <span>{(isRu ? `${editorInChief.cityRu}, ${editorInChief.countryRu}` : `${editorInChief.cityEn}, ${editorInChief.countryEn}`)}</span>
                        </p>
                        <a
                            href={`https://orcid.org/${editorInChief.orcid}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-primary hover:underline text-xs font-mono pt-1"
                        >
                            ORCID: {editorInChief.orcid}
                        </a>
                    </div>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                    <Users className="text-primary shrink-0" size={20} />
                    <h2 className="text-lg md:text-xl font-heading font-bold text-foreground">
                        {isRu ? "Редакционный комитет" : "Editorial Committee"}
                    </h2>
                    <div className="h-px flex-grow bg-border ml-4 opacity-30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editorialCommittee.map((member, i) => (
                        <Card key={i} variant="flat" padding="none" className="bg-card border border-border flex gap-0 overflow-hidden">
                            {member.photoUrl ? (
                                <img
                                    src={member.photoUrl}
                                    alt={isRu ? member.nameRu : member.nameEn}
                                    className="w-28 shrink-0 object-cover"
                                />
                            ) : (
                                <div className="w-28 shrink-0 bg-muted text-muted-foreground flex items-center justify-center">
                                    <GraduationCap size={28} />
                                </div>
                            )}
                            <div className="space-y-2 text-xs font-serif p-5">
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
                                <a
                                    href={`https://orcid.org/${member.orcid}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block text-primary hover:underline text-[10px] font-mono pt-1"
                                >
                                    ORCID: {member.orcid}
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                    <Users className="text-primary shrink-0" size={20} />
                    <h2 className="text-lg md:text-xl font-heading font-bold text-foreground">
                        {isRu ? "Редакционная коллегия" : "Editorial Board"}
                    </h2>
                    <div className="h-px flex-grow bg-border ml-4 opacity-30" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {boardMembers.map((member, i) => (
                        <Card key={i} variant="flat" padding="none" className="bg-card border border-border flex gap-0 overflow-hidden">
                            {member.photoUrl ? (
                                <img
                                    src={member.photoUrl}
                                    alt={isRu ? member.nameRu : member.nameEn}
                                    className="w-28 shrink-0 object-cover"
                                />
                            ) : (
                                <div className="w-28 shrink-0 bg-muted text-muted-foreground flex items-center justify-center">
                                    <GraduationCap size={28} />
                                </div>
                            )}
                            <div className="space-y-2 text-xs font-serif p-5">
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
                                <a
                                    href={`https://orcid.org/${member.orcid}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block text-primary hover:underline text-[10px] font-mono pt-1"
                                >
                                    ORCID: {member.orcid}
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
};