import {
    extendTheme,
    ThemeConfig,
    defineStyleConfig,
    createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    cardAnatomy.keys
);

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const colors = {
    bg: {
        default: '#252B3C',
        navbar: '#2F3647',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#A0AEC0',
    },
    brand: {
        100: '#6B72FF',
        200: '#5056ED',
    },
};

const styles = {
    global: {
        body: {
            bg: 'bg.default',
            color: 'text.primary',
            overflowX: 'hidden',
        },
        '::-webkit-scrollbar': {
            width: '10px',
        },
        '::-webkit-scrollbar-track': {
            background: 'none',
        },
        '::-webkit-scrollbar-thumb': {
            background: 'text.secondary',
            borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: 'brand.100',
        },
    },
};

const Spinner = defineStyleConfig({
    baseStyle: {
        color: 'purple.400',
        position: 'absolute',
        top: '45%',
        left: '48%',
    },
    defaultProps: {
        size: 'xl',
    },
});
const Divider = defineStyleConfig({
    baseStyle: {
        bg: 'text.secondary',
    },
});
const Text = defineStyleConfig({
    baseStyle: {
        color: 'text.primary',
    },
});

const Input = defineStyleConfig({
    defaultProps: {
        // @ts-expect-error This is intentional to set a default focusBorderColor.
        focusBorderColor: 'brand.100',
    },
});
const Select = defineStyleConfig({
    defaultProps: {
        // @ts-expect-error This is intentional to set a default focusBorderColor.
        focusBorderColor: 'brand.100',
    },
});

const baseStyle = definePartsStyle({
    container: {
        backgroundColor: 'bg.navbar',
        borderRadius: '5px',
    },
    header: {
        backgroundColor: 'bg.navbar',
        borderRadius: '5px',
    },
    body: {
        backgroundColor: 'bg.navbar',
        borderRadius: '5px',
    },
    footer: {
        backgroundColor: 'bg.navbar',
        borderRadius: '5px',
    },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });

const theme = extendTheme({
    config,
    styles,
    colors,
    components: { Spinner, Divider, Text, Input, Select, Card: cardTheme },
});

export default theme;
