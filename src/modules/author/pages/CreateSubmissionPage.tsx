import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, FileUp, Info, Globe2 } from 'lucide-react';
import { submissionsApi } from '../../../api/submissions';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import type { CreateSubmissionRequest } from '../../../types/submissions';
import {toast} from "sonner";

export const CreateSubmissionPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateSubmissionRequest>({
        defaultValues: { // ИСПРАВЛЕНО: было defaultOptions
            manuscript_language: 'ru',
            coauthors: [],
            title_ru: '',
            abstract_ru: '',
            keywords_ru: '',
            policy_accepted: false
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "coauthors"
    });

    const onSubmit = async (data: any) => {
        try {
            if (!file) {
                toast.error("Пожалуйста, прикрепите файл статьи (PDF)");
                return;
            }

            const submissionRes = await submissionsApi.createSubmission({
                ...data,
                policy_accepted: true
            });

            await submissionsApi.uploadFile(submissionRes.data.id, file);

            toast.success("Статья успешно подана в редакцию!");
            navigate('/submissions');
        } catch (err) {
            toast.error("Произошла ошибка при подаче статьи");
        }
    };

    return (
        <div className="py-10 px-4 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-heading uppercase italic">Подача новой рукописи</h1> {/* // LOC submission.create.title */}
                <p className="text-semi-transparent text-sm mt-2">Заполните данные о статье и загрузите файл в формате PDF</p> {/* // LOC submission.create.subtitle */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                {/* БЛОК 1: Язык и Название */}
                <section className="bg-white p-8 shadow-card border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-6 border-b border-border pb-4 text-primary">
                        <Globe2 size={20} />
                        <h2 className="text-lg font-heading uppercase tracking-tight">Основные сведения</h2> {/* // LOC submission.section.base */}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-accent font-bold uppercase tracking-widest mb-2 text-primary">
                                Язык основной части статьи {/* // LOC submission.fields.language */}
                            </label>
                            <select
                                {...register('manuscript_language')}
                                className="input-field cursor-pointer"
                            >
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <Input
                            label="Заголовок (RU) *" // // LOC submission.fields.title_ru
                            {...register('title_ru', { required: true })}
                            placeholder="Введите название на русском языке"
                            error={errors.title_ru && "Название обязательно"}
                        />

                        <Input
                            label="Title (EN)" // // LOC submission.fields.title_en
                            {...register('title_en')}
                            placeholder="Enter title in English"
                        />
                    </div>
                </section>

                {/* БЛОК 2: Аннотация и Ключевые слова */}
                <section className="bg-white p-8 shadow-card border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-6 border-b border-border pb-4 text-primary">
                        <Info size={20} />
                        <h2 className="text-lg font-heading uppercase tracking-tight">Аннотация и ключи</h2> {/* // LOC submission.section.abstract */}
                    </div>

                    <div className="space-y-6">
                        <TextArea
                            label="Аннотация (RU) *" // // LOC submission.fields.abstract_ru
                            {...register('abstract_ru', { required: true })}
                            placeholder="Краткое описание работы..."
                        />
                        <Input
                            label="Ключевые слова (RU) *" // // LOC submission.fields.keywords_ru
                            {...register('keywords_ru', { required: true })}
                            placeholder="наука, исследование, ЧелГУ"
                        />
                        <hr className="border-border" />
                        <TextArea
                            label="Abstract (EN)" // // LOC submission.fields.abstract_en
                            {...register('abstract_en')}
                            placeholder="Short summary in English..."
                        />
                        <Input
                            label="Keywords (EN)" // // LOC submission.fields.keywords_en
                            {...register('keywords_en')}
                            placeholder="science, research, CSU"
                        />
                    </div>
                </section>

                {/* БЛОК 3: Соавторы (Динамический список) */}
                <section className="bg-white p-8 shadow-card border-l-4 border-primary">
                    <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Plus size={20} />
                            <h2 className="text-lg font-heading uppercase tracking-tight">Соавторы</h2> {/* // LOC submission.section.coauthors */}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="!py-1 !px-3 !text-[10px]"
                            onClick={() => append({ full_name: '', organization: '', email: '' })}
                        >
                            Добавить соавтора {/* // LOC submission.btn.add_author */}
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-dashed border-border relative group">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="ФИО соавтора"
                                        {...register(`coauthors.${index}.full_name` as const, { required: true })}
                                    />
                                    <Input
                                        label="Email"
                                        {...register(`coauthors.${index}.email` as const)}
                                    />
                                    <Input
                                        label="Организация"
                                        className="md:col-span-2"
                                        {...register(`coauthors.${index}.organization` as const)}
                                    />
                                </div>
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <p className="text-center text-xs text-muted py-4 italic">Если вы единственный автор, оставьте этот список пустым</p>
                        )}
                    </div>
                </section>

                {/* БЛОК 4: Загрузка файла */}
                <section className="bg-white p-8 shadow-card border-l-4 border-accent">
                    <div className="flex items-center gap-2 mb-6 border-b border-border pb-4 text-accent">
                        <FileUp size={20} />
                        <h2 className="text-lg font-heading uppercase tracking-tight">Файл рукописи</h2> {/* // LOC submission.section.file */}
                    </div>

                    <div className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${file ? 'border-green-500 bg-green-50' : 'border-border bg-grey-50'}`}>
                        {!file ? (
                            <>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FileUp size={48} className="mx-auto text-muted mb-4" />
                                    <p className="font-bold text-primary uppercase text-xs tracking-widest">Выберите PDF файл</p> {/* // LOC submission.file.select */}
                                    <p className="text-[10px] text-muted mt-2">Максимальный размер: 25MB</p>
                                </label>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <p className="font-serif italic text-foreground mb-4">{file.name}</p>
                                <Button type="button" variant="outline" className="!py-1" onClick={() => setFile(null)}>Изменить файл</Button>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-start gap-3 bg-blue-50 p-4 border-l-4 border-blue-400">
                        <input
                            type="checkbox"
                            {...register('policy_accepted', { required: true })}
                            className="mt-1"
                        />
                        <p className="text-xs text-blue-900 leading-relaxed">
                            Я подтверждаю, что статья является оригинальной, не была опубликована ранее и соответствует этическим нормам журнала. {/* // LOC submission.policy.text */}
                        </p>
                    </div>
                </section>

                {/* Кнопка отправки */}
                <div className="flex justify-end pt-6">
                    <Button
                        type="submit"
                        className="w-full md:w-auto px-12 py-4"
                        isLoading={isSubmitting}
                    >
                        <Save size={18} />
                        Отправить в редакцию {/* // LOC submission.btn.submit_all */}
                    </Button>
                </div>
            </form>
        </div>
    );
};