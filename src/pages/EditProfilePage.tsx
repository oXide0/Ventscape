import ProfileForm from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useSubmitting } from 'hooks/useSubmitting';
import { useUserData } from 'hooks/useUserData';
import { removeUserAvatar, updateUser, uploadUserAvatar } from 'services/userActions';
import { User } from 'types/types';

const EditProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { user, avatarUrl: serverAvatarUrl, isLoading } = useUserData(id);

    const { submit } = useSubmitting(async (data: User, avatarFile: File | null) => {
        await updateUser(data, id);
        if (avatarFile) {
            await uploadUserAvatar(avatarFile, id);
        } else {
            await removeUserAvatar(id);
        }
    });

    if (isLoading) return <Loader />;

    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm submit={submit} userData={user} serverAvatarUrl={serverAvatarUrl} />
        </PageLayout>
    );
};

export default EditProfilePage;
