import { Box, Heading } from '@chakra-ui/react';

interface PageLayoutProps {
    children: React.ReactNode;
    heading?: string;
}

const PageLayout = ({ children, heading }: PageLayoutProps) => {
    return (
        <Box py={6}>
            <Heading textAlign='center' pb={8}>
                {heading}
            </Heading>
            {children}
        </Box>
    );
};

export default PageLayout;
