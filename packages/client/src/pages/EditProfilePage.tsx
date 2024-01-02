import ProfileForm from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useSubmitting } from 'hooks/useSubmitting';
import { useUserData } from 'hooks/useUserData';
import { removeUserAvatar, updateUser, uploadUserAvatar } from 'services/userActions';
import { ImageValues, User } from 'types/types';

const EditProfilePage = () => {
    const { id } = useAppSelector(selectUser);
    const { user, avatarUrl: serverAvatarUrl, isLoading } = useUserData(id);

    const { submit } = useSubmitting(async (data: User, avatar: ImageValues) => {
        await updateUser(data, id);
        if (avatar.file) {
            await uploadUserAvatar(avatar.file, id);
        } else if (!avatar.url) {
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
