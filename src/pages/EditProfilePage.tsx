import ProfileForm from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useFetching } from 'hooks/useFetching';
import { useSubmitting } from 'hooks/useSubmitting';
import { useEffect, useState } from 'react';
import {
    getUserAvatar,
    getUserById,
    removeUserAvatar,
    updateUser,
    uploadUserAvatar,
} from 'services/userActions';
import { User } from 'types/types';

const EditProfilePage = () => {
    const userData = useAppSelector(selectUser);
    const [user, setUser] = useState<User>();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatartUrl, setAvatarUrl] = useState<string | null>(null);
    const { fetch, isLoading } = useFetching(async () => {
        const userServerData = await getUserById(userData.id);
        if (userServerData) setUser(userServerData);
        const avatar = await getUserAvatar(userData.id);
        if (avatar) setAvatarUrl(avatar);
    });

    const { submit } = useSubmitting(async (data: User) => {
        await updateUser(data, userData.id);
        if (avatarFile) {
            await uploadUserAvatar(avatarFile, userData.id);
        } else {
            await removeUserAvatar(userData.id);
        }
    });

    const setFile = (file: File | null) => {
        if (file) {
            setAvatarFile(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const onEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFile(file);
    };

    const removeFile = () => {
        setFile(null);
        setAvatarUrl(null);
    };

    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm
                submit={submit}
                userData={user}
                avatarUrl={avatartUrl}
                onEventFileChange={onEventFileChange}
                removeFile={removeFile}
            />
        </PageLayout>
    );
};

export default EditProfilePage;
