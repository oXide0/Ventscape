import { Avatar, Button, Card, Image, Link, Stack, Text } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { User } from 'types/types';

interface BlockPathProps {
    followersBlock: React.MutableRefObject<HTMLElement | null>;
    subscriptionsBlock: React.MutableRefObject<HTMLElement | null>;
}

interface ProfileCardProps extends User {
    avatarUrl: string | null;
    bgPhotoUrl: string | null;
    showFollowButton?: boolean;
    onFollowClick?: () => void;
    isFollowed?: boolean;
    paths: BlockPathProps;
}

interface ProfileAvatarProps {
    avatarUrl: string | null;
}

interface UserInfoProps extends User {
    paths: BlockPathProps;
}

interface BottomSectionProps {
    showFollowButton: boolean;
    isFollowed?: boolean;
    onFollowClick?: () => void;
}

const ProfileCard = ({ showFollowButton = false, ...props }: ProfileCardProps) => {
    return (
        <Card rounded='md'>
            <Stack pos='relative'>
                <BackgroundImage bgPhotoUrl={props.bgPhotoUrl} />
                <ProfileAvatar avatarUrl={props.avatarUrl} />
            </Stack>

            <Stack direction='row' justify='space-between' alignItems='flex-end' p='12'>
                <UserInfo {...props} />
                <BottomSection
                    showFollowButton={showFollowButton}
                    onFollowClick={props.onFollowClick}
                    isFollowed={props.isFollowed}
                />
            </Stack>
        </Card>
    );
};

export default ProfileCard;

const ProfileAvatar = ({ avatarUrl }: ProfileAvatarProps) => {
    return (
        <Avatar
            src={avatarUrl ? avatarUrl : 'https://bit.ly/broken-link'}
            border='2px solid #2F3647'
            transition='.2s'
            size='2xl'
            pos='absolute'
            bottom={-10}
            left={10}
            mt={2}
        />
    );
};

const BackgroundImage = ({ bgPhotoUrl }: { bgPhotoUrl: string | null }) => (
    <Stack bg={bgPhotoUrl ? 'transparent' : 'gray.500'} roundedTop='md' h='260px' objectFit='cover'>
        {bgPhotoUrl && <Image src={bgPhotoUrl} roundedTop='md' maxH='260px' objectFit='cover' />}
    </Stack>
);

const UserInfo = ({ name, email, accountType, followers, subscriptions, paths }: UserInfoProps) => {
    const scrollToSection = (elementRef: React.MutableRefObject<HTMLElement | null>) => {
        if (elementRef.current) {
            window.scrollTo({
                top: elementRef.current.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Stack spacing={0}>
            <Text fontSize='3xl' fontWeight='semibold'>
                {name}
            </Text>
            <Text>{email}</Text>
            {accountType === 'creator' && (
                <Link
                    color='#787bff'
                    fontWeight='semibold'
                    onClick={() => scrollToSection(paths.followersBlock)}
                >
                    {followers.length} followers
                </Link>
            )}
            <Link
                color='#787bff'
                fontWeight='semibold'
                onClick={() => scrollToSection(paths.subscriptionsBlock)}
            >
                {subscriptions.length} subscriptions
            </Link>
        </Stack>
    );
};

const BottomSection = ({ showFollowButton, isFollowed, onFollowClick }: BottomSectionProps) => (
    <Stack w='56'>
        {showFollowButton ? (
            isFollowed ? (
                <Button onClick={onFollowClick}>Unfollow</Button>
            ) : (
                <Button colorScheme='brand' color='text.white' onClick={onFollowClick}>
                    Follow
                </Button>
            )
        ) : (
            <Button
                colorScheme='brand'
                color='text.white'
                display='flex'
                gap={2}
                alignItems='center'
                as={RouterLink}
                to='/profile/edit'
            >
                <MdEdit />
                Edit profile
            </Button>
        )}
    </Stack>
);
