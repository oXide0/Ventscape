import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store/store';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </MemoryRouter>
        </Provider>
    );
};
