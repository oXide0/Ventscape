import { memo } from 'react';
import { inputClasses } from 'utils/styles';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    register: UseFormRegisterReturn;
    errors: Record<string, FieldError>;
    className?: string;
}

const Input = memo((props: InputProps) => {
    const { label, id, register, errors, className, ...restProps } = props;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className='flex justify-between'>
                <label htmlFor={id} className='block text-sm font-medium leading-6 text-white'>
                    {label}
                </label>
                <label className='text-red-500'>{errors?.[id] && errors?.[id].message}</label>
            </div>
            <input {...restProps} id={id} {...register} className={inputClasses} />
        </div>
    );
});

export default Input;
