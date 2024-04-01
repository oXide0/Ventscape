import { render } from '@testing-library/react';
import TabLink from 'components/ui/TabLink';
import { FaHome } from 'react-icons/fa';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/react';
import theme from '../theme';

describe('TabLink component', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <TabLink to='/' icon={<FaHome />} label='Home' />
                </MemoryRouter>
            </ThemeProvider>
        );
    });

    it('renders label correctly', () => {
        const label = 'Home';
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <TabLink to='/' icon={<FaHome />} label={label} />
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(getByText(label)).toBeInTheDocument();
    });

    it('creating snapshot for label', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <TabLink to='/' icon={<FaHome />} label='Home' />
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(getByText('Home')).toMatchSnapshot();
    });
});
