import { Box, Heading } from '@chakra-ui/react';

interface PageLayoutProps {
    children: React.ReactNode;
    heading?: string;
    centered?: boolean;
}

const PageLayout = ({ children, heading, centered = false }: PageLayoutProps) => {
    const styles = {
        margin: centered ? '0 auto' : '0',
        maxW: centered ? 'lg' : 'none',
        width: '100%',
    };

    return (
        <Box py={6} sx={styles}>
            <Heading textAlign='center' pb={8}>
                {heading}
            </Heading>
            {children}
        </Box>
    );
};

export default PageLayout;
