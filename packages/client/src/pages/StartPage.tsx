import { Heading } from '@chakra-ui/react';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { getGreeting } from 'utils/helpers';

const StartPage = () => {
    const { name } = useAppSelector(selectUser);

    return (
        <PageLayout>
            {name ? (
                <Heading>
                    {getGreeting()} {name}!
                </Heading>
            ) : (
                <Heading>{getGreeting()}!</Heading>
            )}
        </PageLayout>
    );
};

export default StartPage;
