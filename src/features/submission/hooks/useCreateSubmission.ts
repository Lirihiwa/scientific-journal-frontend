import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { submissionFormSchema, type SubmissionFormData } from '../submission.types';
import { submissionApi } from '../submission.api';

export const useCreateSubmission = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm<SubmissionFormData>({
        resolver: zodResolver(submissionFormSchema),
        defaultValues: { manuscript_language: isRu ? 'ru' : 'en', coauthors: [], policy_accepted: false }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "coauthors" });

    const createMutation = useMutation({
        mutationFn: async (data: SubmissionFormData) => {
            if (!file) throw new Error(isRu ? "Пожалуйста, загрузите файл рукописи" : "Please upload a manuscript file");
            const submission = await submissionApi.create(data);
            await submissionApi.uploadFile(submission.id, file);
            return submission;
        },
        onSuccess: () => {
            toast.success(isRu ? "Рукопись успешно отправлена" : "Manuscript submitted successfully");
            navigate('/submissions');
        },
        onError: (error: any) => toast.error(error.message || (isRu ? "Ошибка при отправке" : "Submission error"))
    });

    return {
        register,
        control,
        errors,
        handleSubmit,
        fields,
        append,
        remove,
        file,
        setFile,
        createMutation,
        t,
        isRu
    };
};