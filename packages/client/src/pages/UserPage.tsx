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
    const { data, isSuccess, error } = useGetUserByIdQuery(userId);
    const { data: avatar } = useGetImageUrlQuery(data?.avatarId, {
        skip: !data?.avatarId
    });

    if (!isSuccess) return <Loader />;
    if (error) {
        return (
            <Heading textAlign='center' pt={6}>
                User profile is not found
            </Heading>
        );
    }

    return (
        <PageLayout>
            <ProfileCard bgPhotoUrl={null} avatarUrl={avatar?.url} {...data} />
            <InfoUserCard
                title='About'
                content={data.description}
                noContentText='User has no description'
            />
            {data.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    actions={
                        <Button
                            colorScheme='brand'
                            color='white'
                            as={RouterLink}
                            to={`/user/${userId}/events`}>
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
