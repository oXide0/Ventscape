import { Stack, Link as ChakraLink, Text, useTheme } from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { Link as ReactRouterLink, useMatch } from 'react-router-dom';

interface TabLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed?: boolean;
}

const TabLink = ({ to, icon, label, isCollapsed }: TabLinkProps) => {
    const match = useMatch(to);
    const theme = useTheme();

    return (
        <IconContext.Provider
            value={{
                size: '1.7em',
                color: match ? theme.colors.text.primary : theme.colors.text.secondary,
            }}
        >
            <ChakraLink as={ReactRouterLink} to={to} style={{ textDecoration: 'none' }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent={{ base: 'center', xl: isCollapsed ? 'center' : 'flex-start' }}
                    _hover={{ bg: 'bg.default' }}
                    _active={{ transform: 'scale(0.95)', transition: 'all 0.2s ease-in-out' }}
                    bg={match ? 'bg.default' : 'transparent'}
                    px={3}
                    py={2}
                    rounded='md'
                    cursor='pointer'
                >
                    {icon}
                    {isCollapsed ? null : (
                        <Text
                            color={match ? 'text.primary' : 'text.secondary'}
                            display={{ base: 'none', xl: 'block' }}
                        >
                            {label}
                        </Text>
                    )}
                </Stack>
            </ChakraLink>
        </IconContext.Provider>
    );
};

export default TabLink;
