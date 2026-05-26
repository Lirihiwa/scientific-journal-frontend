import React from 'react';
import {CheckCircle, FileUp, Save} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {cn} from '../../utils/cn';
import {Button} from './Button';

interface FileUploaderProps {
    file: File | null;
    onFileChange: (file: File | null) => void;
    currentFileName?: string | null;
    accept?: string;
    isLoading?: boolean;
    onSave?: () => void;
}

export const FileUploader = ({
                                 file,
                                 onFileChange,
                                 // currentFileName,
                                 accept = ".pdf,.doc,.docx",
                                 isLoading = false,
                                 onSave
                             }: FileUploaderProps) => {
    const {t, i18n} = useTranslation();
    const isRu = i18n.language.startsWith('ru');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        onFileChange(selectedFile);
    };

    return (
        <div className={cn(
            "border-2 border-dashed rounded-sm p-8 text-center transition-colors",
            file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        )}>
            {!file ? (
                <label className="cursor-pointer block">
                    <FileUp size={40} className="mx-auto text-muted-foreground mb-3"/>
                    <span className="text-[10px] font-accent font-bold uppercase tracking-widest">
                        {isRu ? 'Выберите файл статьи' : 'Choose article file'}
                    </span>
                    <p className="mt-2 text-xs font-serif text-muted-foreground">
                        {isRu ? 'Поддерживаемые форматы: PDF, DOC, DOCX' : 'Supported formats: PDF, DOC, DOCX'}
                    </p>
                    <input
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </label>
            ) : (
                <div className="flex flex-col items-center">
                    <CheckCircle size={32} className="text-primary mb-2"/>
                    <p className="font-serif text-sm text-foreground mb-2 break-all">{file.name}</p>

                    {onSave ? (
                        <div className="flex gap-4 mt-2">
                            <Button
                                size="sm"
                                onClick={onSave}
                                isLoading={isLoading}
                            >
                                <Save size={14} className="mr-2"/> {t('common.save')}
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onFileChange(null)}
                                disabled={isLoading}
                            >
                                {t('common.cancel')}
                            </Button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onFileChange(null)}
                            className="text-[9px] font-bold uppercase text-primary hover:underline mt-2"
                            disabled={isLoading}
                        >
                            {isRu ? 'Заменить' : 'Replace'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};