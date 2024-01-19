import ProfileForm, { ProfileFormValues } from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'services/userApi';

const EditProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { data: user, isSuccess: isUserDataSuccess } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = async (data: ProfileFormValues) => {
        await updateUser({ id, avatarUrl: '', ...data });
    };

    if (isLoading || !isUserDataSuccess) return <Loader />;
    // TODO: ProfileForm rerenders after updating user data - maybe need to fix it
    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm submit={onSubmit} userData={user} serverAvatarUrl={null} />
        </PageLayout>
    );
};

export default EditProfilePage;
