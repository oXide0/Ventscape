import { extendTheme, ThemeConfig } from '@chakra-ui/react';

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

const theme = extendTheme({ config, styles, colors });

export default theme;
