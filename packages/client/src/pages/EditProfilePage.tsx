import ProfileForm from 'components/ProfileForm';
import { useUpdateUserMutation, useGetUserByIdQuery } from 'services/userApi';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';

// import { useGetUserByIdQuery } from 'services/userApi';

interface ProfileFormValues {
    name: string;
    description: string;
    email: string;
    accountType: 'customer' | 'creator';
}

const EditProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { data: user, isSuccess: isUserDataSuccess } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = async (data: ProfileFormValues) => {
        await updateUser({ id, avatarUrl: '', ...data });
    };

    if (isLoading || !isUserDataSuccess) return <Loader />;

    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm submit={onSubmit} userData={user} serverAvatarUrl={null} />
        </PageLayout>
    );
};

export default EditProfilePage;
