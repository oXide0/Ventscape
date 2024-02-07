import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { memo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { capitalizeFirstLetter } from 'utils/helpers';

interface SelectFieldProps {
    readonly name: string;
    readonly label?: string;
    readonly register?: UseFormRegisterReturn;
    readonly errors?: Record<string, any>;
    readonly defaultValue?: string;
    readonly options: { label: string; value: string }[];
    readonly disabled?: boolean;
}

const SelectField = memo(
    ({
        name,
        errors,
        label,
        register,
        options,
        defaultValue,
        disabled = false
    }: SelectFieldProps) => {
        return (
            <FormControl isInvalid={errors ? !!errors[name] : false}>
                <FormLabel htmlFor={name}>{label ? label : capitalizeFirstLetter(name)}</FormLabel>
                <Select {...register} defaultValue='' disabled={disabled}>
                    {defaultValue && (
                        <option disabled value=''>
                            {defaultValue}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        );
    }
);

export default SelectField;
