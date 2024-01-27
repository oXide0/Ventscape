import { Button, Heading } from '@chakra-ui/react';
import InfoUserCard from 'components/InfoUserCard';
import ProfileCard from 'components/ProfileCard';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Link as RouterLink } from 'react-router-dom';
import { useGetUserByIdQuery } from 'services/userApi';
import { EditIcon } from 'utils/icons';
import { useGetImageUrlQuery } from 'services/imageApi';

const ProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { data: user, isSuccess: isUserSuccess, error } = useGetUserByIdQuery(id, { skip: !id });
    const { data: avatar } = useGetImageUrlQuery(user?.avatarId, {
        skip: !user?.avatarId,
    });

    if (!isUserSuccess) return <Loader />;
    if (error) {
        <Heading textAlign='center' pt={6}>
            Your profile is not found
        </Heading>;
    }

    return (
        <PageLayout>
            <ProfileCard
                bgPhotoUrl={null}
                avatarUrl={avatar?.url}
                {...user}
                actions={
                    <Button
                        colorScheme='brand'
                        color='text.white'
                        display='flex'
                        gap={2}
                        alignItems='center'
                        as={RouterLink}
                        to='/profile/edit'
                        maxW='200px'
                        w='full'
                    >
                        <EditIcon />
                        Edit profile
                    </Button>
                }
            />
            <InfoUserCard
                title='About'
                content={user.description}
                noContentText='You have no description'
            />
            {user.accountType === 'creator' && (
                <InfoUserCard
                    title='Events'
                    actions={
                        <Button
                            colorScheme='brand'
                            color='white'
                            as={RouterLink}
                            to={`/user/${id}/events`}
                            w='full'
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

export default ProfilePage;
