import { Button, Heading } from '@chakra-ui/react';
import InfoUserCard from 'components/InfoUserCard';
import ProfileCard from 'components/ProfileCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from 'services/userApi';

const UserPage = () => {
    const { userId } = useParams();
    const { data: user, isSuccess: isUserSuccess, error } = useGetUserByIdQuery(userId);

    if (!isUserSuccess) return <Loader />;
    if (error) {
        <Heading textAlign='center' pt={6}>
            User profile is not found
        </Heading>;
    }

    return (
        <PageLayout>
            <ProfileCard bgPhotoUrl={null} {...user} />
            <InfoUserCard
                title='About'
                content={user.description}
                noItemsText='User has no description'
            />
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    items={[
                        <Button
                            colorScheme='brand'
                            color='white'
                            as={RouterLink}
                            to={`/user/${userId}/events`}
                        >
                            Show events
                        </Button>,
                    ]}
                    noItemsText='You have no events'
                />
            )}
        </PageLayout>
    );
};

export default UserPage;
