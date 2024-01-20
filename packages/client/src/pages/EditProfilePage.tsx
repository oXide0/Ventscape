import { useToast } from '@chakra-ui/react';
import ProfileForm, { ProfileFormValues } from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'services/userApi';

const EditProfilePage = () => {
    const toast = useToast();
    const { id } = useAppSelector(selectUser);
    const { data: user, isSuccess } = useGetUserByIdQuery(id);
    const [updateUser] = useUpdateUserMutation();

    const handleSubmit = async (data: ProfileFormValues) => {
        await updateUser({ id, avatarUrl: '', ...data });
        toast({
            title: 'Profile updated.',
            description: "We've updated your profile for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };

    if (!isSuccess) return <Loader />;

    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm submit={handleSubmit} userData={user} serverAvatarUrl={null} />
        </PageLayout>
    );
};

export default EditProfilePage;
