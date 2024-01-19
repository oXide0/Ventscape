import { Link as ChakraLink, Stack, Text, useTheme } from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { Link as ReactRouterLink, useMatch } from 'react-router-dom';

interface TabLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    isBold?: boolean;
}

const TabLink = ({ to, icon, label, isBold }: TabLinkProps) => {
    const isEditProfileActive = useMatch('/profile/edit');
    const match = useMatch(to);
    const theme = useTheme();
    const isActive = (to === '/profile' && isEditProfileActive) || match;

    return (
        <IconContext.Provider
            value={{
                size: '1.7em',
                color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
            }}
        >
            <ChakraLink as={ReactRouterLink} to={to} style={{ textDecoration: 'none' }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent={{ base: 'center', xl: 'flex-start' }}
                    _hover={{ bg: 'bg.default' }}
                    _active={{ transform: 'scale(0.95)', transition: 'all 0.2s ease-in-out' }}
                    bg={isActive ? 'bg.default' : 'transparent'}
                    px={3}
                    py={2}
                    rounded='md'
                    cursor='pointer'
                >
                    {icon}
                    <Text
                        color={isActive ? 'text.primary' : 'text.secondary'}
                        display={{ base: 'none', xl: 'block' }}
                        fontWeight={isBold ? 'bold' : 'normal'}
                    >
                        {label}
                    </Text>
                </Stack>
            </ChakraLink>
        </IconContext.Provider>
    );
};

export default TabLink;
