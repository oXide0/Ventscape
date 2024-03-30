import { useToast } from '@chakra-ui/react';
import ProfileForm, { ProfileFormValues } from 'components/ProfileForm';
import Loader from 'components/ui/Loader';
import PageLayout from 'components/ui/PageLayout';
import { selectUser, setUserAvatar } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import {
    useGetImageUrlQuery,
    useRemoveImageMutation,
    useUploadImageMutation
} from 'services/imageApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'services/userApi';
import { ImageValues } from 'types/types';
import { mapUsersToProfileFormValues } from 'utils/helpers';

const EditProfilePage = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const { id } = useAppSelector(selectUser);
    const { data, isSuccess } = useGetUserByIdQuery(id);
    const { data: avatarUrl } = useGetImageUrlQuery(data?.avatarId, {
        skip: !data?.avatarId
    });
    const [updateUser] = useUpdateUserMutation();
    const [uploadAvatar] = useUploadImageMutation();
    const [removeAvatar] = useRemoveImageMutation();

    const handleSubmit = async (user: ProfileFormValues, avatar: ImageValues) => {
        try {
            if (!id) return;
            if (!data) throw new Error('Event not found.');
            if (!avatar.file && avatar.url) {
                await updateUser({ id, ...data, ...user }).unwrap();
            } else if (!avatar.file && !avatar.url) {
                if (data.avatarId) await removeAvatar(data.avatarId).unwrap();
                await updateUser({
                    id,
                    avatarId: '',
                    ...user
                }).unwrap();
                dispatch(setUserAvatar(null));
            } else if (avatar.file && avatar.url) {
                if (data.avatarId) await removeAvatar(data.avatarId).unwrap();
                const avatarData = await uploadAvatar({ image: avatar.file }).unwrap();
                await updateUser({
                    id,
                    avatarId: avatarData.id,
                    ...user
                }).unwrap();
                dispatch(setUserAvatar(avatar.url));
            }
            toast({
                title: 'Profile updated.',
                description: "We've updated your profile for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred.',
                description: "We couldn't update your profile, please try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        }
    };

    if (!isSuccess) return <Loader />;

    return (
        <PageLayout heading='Profile settings'>
            <ProfileForm
                submit={handleSubmit}
                userData={mapUsersToProfileFormValues(data)}
                avatarUrl={avatarUrl?.url}
            />
        </PageLayout>
    );
};

export default EditProfilePage;
