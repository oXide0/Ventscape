import {
    Badge,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import UserProfileCard from 'components/UserProfileCard';
import { IoIosNotifications } from 'react-icons/io';

interface NotificationBadgeProps {
    notifications: string[];
    onClear: () => void;
}

const NotificationBadge = ({ notifications, onClear }: NotificationBadgeProps) => {
    const { onClose } = useDisclosure();

    const handleClear = () => {
        onClose();
        onClear();
    };

    return (
        <Popover onClose={handleClear}>
            <PopoverTrigger>
                <Stack pos='relative' cursor='pointer'>
                    <IconButton
                        aria-label='Notifications'
                        icon={<IoIosNotifications size='2em' />}
                        background='transparent'
                        variant='unstyled'
                        size='md'
                        display='flex'
                        justifyContent='center'
                    />
                    {notifications.length && (
                        <Badge
                            pos='absolute'
                            bg='purple.600'
                            rounded='full'
                            w='15px'
                            height='15px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            p={2}
                            top={1}
                            right={1}
                        >
                            {notifications.length}
                        </Badge>
                    )}
                </Stack>
            </PopoverTrigger>
            <PopoverContent w='350px'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody display='flex' flexDirection='column' gap={4}>
                    {notifications.length ? (
                        notifications.map((n) => (
                            <Stack key={n} direction='row' alignItems='center'>
                                <UserProfileCard userId={n} showEmail={false} />
                                <Text fontWeight='semibold'>has followed you</Text>
                            </Stack>
                        ))
                    ) : (
                        <Text>Here are your notifications...</Text>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationBadge;
