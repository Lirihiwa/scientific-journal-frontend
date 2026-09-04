import { useFormContext } from 'react-hook-form';
import { TextArea, type TextAreaProps } from './TextArea';

interface FormTextAreaProps extends Omit<TextAreaProps, 'error'> {
    name: string;
}

export const FormTextArea = ({ name, ...props }: FormTextAreaProps) => {
    const { register, formState: { errors } } = useFormContext();

    // Безопасное разрешение вложенных путей ошибок
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)?.message as string | undefined;

    return <TextArea error={error} {...register(name)} {...props} />;
};