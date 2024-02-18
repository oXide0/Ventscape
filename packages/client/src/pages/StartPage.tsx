import { Heading } from '@chakra-ui/react';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { getGreeting } from 'utils/helpers';

const StartPage = () => {
    const { name } = useAppSelector(selectUser);
    const greeting = name ? `${getGreeting()}, ${name}!` : `${getGreeting()}!`;

    return (
        <PageLayout>
            <Heading>{greeting}</Heading>
        </PageLayout>
    );
};

export default StartPage;
