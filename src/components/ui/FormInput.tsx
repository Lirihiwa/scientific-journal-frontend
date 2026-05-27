import { useFormContext } from 'react-hook-form';
import { Input, type InputProps } from './Input.tsx';

interface FormInputProps extends Omit<InputProps, 'error'> {
    name: string;
}

export const FormInput = ({ name, ...props }: FormInputProps) => {
    const { register, formState: { errors } } = useFormContext();

    // Безопасное разрешение вложенных путей ошибок (например, "coauthors.0.full_name")
    const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)?.message as string | undefined;

    return <Input error={error} {...register(name)} {...props} />;
};