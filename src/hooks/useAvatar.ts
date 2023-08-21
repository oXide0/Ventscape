import { useEffect, useState } from 'react';
import { getUserAvatar } from 'services/userActions';
import { useAuth } from './useAuth';

export const useAvatar = () => {
	const { userData } = useAuth();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	useEffect(() => {
		const getAvatar = async () => {
			if (userData.id) {
				const url = await getUserAvatar(userData.id);
				if (url) {
					setAvatarUrl(url);
				}
			}
		};
		getAvatar();
	}, [userData.isUploadedAvatar]);

	return avatarUrl;
};
