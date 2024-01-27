import { Button, Heading } from '@chakra-ui/react';
import InfoUserCard from 'components/InfoUserCard';
import ProfileCard from 'components/ProfileCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from 'services/userApi';
import { useGetImageUrlQuery } from 'services/imageApi';

const UserPage = () => {
    const { userId } = useParams();
    const { data: user, isSuccess: isUserSuccess, error } = useGetUserByIdQuery(userId);
    const { data: avatar } = useGetImageUrlQuery(user?.avatarId, {
        skip: !user?.avatarId,
    });

    if (!isUserSuccess) return <Loader />;
    if (error) {
        <Heading textAlign='center' pt={6}>
            User profile is not found
        </Heading>;
    }

    return (
        <PageLayout>
            <ProfileCard bgPhotoUrl={null} avatarUrl={avatar?.url} {...user} />
            <InfoUserCard
                title='About'
                content={user.description}
                noContentText='User has no description'
            />
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    actions={
                        <Button
                            colorScheme='brand'
                            color='white'
                            as={RouterLink}
                            to={`/user/${userId}/events`}
                        >
                            Show events
                        </Button>
                    }
                    noContentText='You have no events'
                />
            )}
        </PageLayout>
    );
};

export default UserPage;
