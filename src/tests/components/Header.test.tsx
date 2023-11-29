import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store/store';
import Header from 'components/Header';
import { render } from '@testing-library/react';

describe('Header component', () => {
    it('should render correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();
    });
});
