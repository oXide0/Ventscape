import { User } from 'types/types';
import { updateUser } from 'services/userActions';

export const useFollow = (
    authUser: User | undefined,
    creator: User | null,
    creatorId: string | undefined,
    authUserId: string
) => {
    const onFollowClick = async () => {
        if (creator && creatorId && authUser) {
            await updateUser(
                {
                    ...authUser,
                    subscriptions: [...authUser.subscriptions, creatorId],
                },
                authUserId
            );
            await updateUser(
                { ...creator, followers: [...creator.followers, authUserId] },
                creatorId
            );
        }
    };

    const onUnfollowClick = async () => {
        if (creator && creatorId && authUser) {
            await updateUser(
                {
                    ...authUser,
                    subscriptions: authUser.subscriptions.filter((id) => id !== creatorId),
                },
                authUserId
            );
            await updateUser(
                {
                    ...creator,
                    followers: authUser.followers.filter((id) => id !== authUserId),
                },
                creatorId
            );
        }
    };
    return { onFollowClick, onUnfollowClick };
};
