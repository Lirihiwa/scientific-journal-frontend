import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { submissionApi } from '../submission.api';

export const useSubmissionDetails = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isRu = i18n.language.startsWith('ru');
    const queryClient = useQueryClient();
    const [file, setFile] = useState<File | null>(null);

    const { data: submission, isLoading } = useQuery({
        queryKey: ['submission', id],
        queryFn: () => submissionApi.getById(id!),
        enabled: !!id,
    });

    const uploadFileMutation = useMutation({
        mutationFn: async (file: File) => {
            return submissionApi.uploadFile(id!, file);
        },
        onSuccess: () => {
            toast.success(isRu ? 'Файл успешно обновлён' : 'File updated successfully');
            setFile(null);
            queryClient.invalidateQueries({ queryKey: ['submission', id] });
        },
        onError: () => toast.error(isRu ? 'Ошибка загрузки файла' : 'Upload error'),
    });

    return {
        id,
        submission,
        isLoading,
        file,
        setFile,
        uploadFileMutation,
        t,
        isRu
    };
};