import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { capitalizeFirstLetter } from 'utils/helpers';

interface TextFieldProps {
    readonly name: string;
    readonly label?: string;
    readonly placeholder?: string;
    readonly type?: string;
    readonly register?: UseFormRegisterReturn;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly errors?: Record<string, any>;
}

const TextField = memo(({ type = 'text', ...props }: TextFieldProps) => {
    if (type === 'password') {
        return <PasswordField {...props} />;
    }

    return (
        <FormControl isInvalid={props.errors ? !!props.errors[props.name] : false}>
            <FormLabel htmlFor={props.name}>
                {props.label ? props.label : capitalizeFirstLetter(props.name)}
            </FormLabel>
            <Input
                id={props.name}
                type={type}
                placeholder={props.placeholder}
                {...props.register}
            />
            <FormErrorMessage>
                {props.errors && props.errors[props.name] && props.errors[props.name].message}
            </FormErrorMessage>
        </FormControl>
    );
});

const PasswordField = memo(
    ({ name, label, placeholder, errors, register }: Omit<TextFieldProps, 'type'>) => {
        const [showPassword, setShowPassword] = useState(false);
        const toggleShow = () => setShowPassword(!showPassword);

        return (
            <FormControl isInvalid={errors ? !!errors[name] : false}>
                <FormLabel htmlFor={name}>{label ? label : capitalizeFirstLetter(name)}</FormLabel>
                <InputGroup>
                    <Input
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                        {...register}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={toggleShow}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <FormErrorMessage>
                    {errors && errors[name] && errors[name].message}
                </FormErrorMessage>
            </FormControl>
        );
    }
);

export default TextField;
