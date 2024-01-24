import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter as ChakraCardFooter,
    Divider,
    Flex,
    Heading,
    Highlight,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { memo, useRef } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from 'services/userApi';
import { IEvent } from 'shared/types';
import { convertDateFormat } from 'utils/events';
import { DotsIcon, LocationIcon, MoneyIcon, OnlineIcon, TimeIcon } from 'utils/icons';

interface EventCardProps extends IEvent {
    onRemoveEvent?: (eventId: string) => void;
}

const EventCard = memo(({ onRemoveEvent, ...event }: EventCardProps) => {
    const { data: creator } = useGetUserByIdQuery(event.creatorId);
    const navigate = useNavigate();

    const onAvatarClick = () => {
        navigate(`/user/${event.creatorId}`);
    };

    return (
        <Card maxW='650px' h='auto'>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar src={creator?.avatarUrl} cursor='pointer' onClick={onAvatarClick} />
                        <Box>
                            <Heading size='sm'>{creator?.name}</Heading>
                            <Text>Creator, {creator?.name}</Text>
                        </Box>
                    </Flex>
                    {onRemoveEvent && (
                        <Popover>
                            <PopoverTrigger>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<DotsIcon />}
                                />
                            </PopoverTrigger>
                            <CardPopover eventId={event.id} removeEvent={onRemoveEvent} />
                        </Popover>
                    )}
                </Flex>
            </CardHeader>
            <CardBody>
                <Heading size='lg'>{event.title}</Heading>
                <Text pt={1}>{event.description}</Text>
            </CardBody>
            <CardFooter {...event} />
        </Card>
    );
});

export default EventCard;

interface CardFooterProps {
    mode: string;
    city: string;
    date: string;
    price: number;
    country: string;
    street: string;
    link: string;
}

const CardFooter = ({ mode, city, date, price, country, street, link }: CardFooterProps) => {
    const { isAuth } = useAppSelector(selectUser);
    const apllyPath = isAuth ? link : '/login';

    return (
        <ChakraCardFooter flexDir='column'>
            <Flex
                justify='space-between'
                flexWrap='wrap'
                w='full'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                {mode === 'offline' ? (
                    <Flex alignItems='center' gap={2} pt={4}>
                        <LocationIcon size='1.5em' />
                        <Text>{city}</Text>
                    </Flex>
                ) : (
                    <Flex alignItems='center' gap={2} pt={4}>
                        <OnlineIcon size='1.5em' />
                        <Text>Online</Text>
                    </Flex>
                )}
                <Flex alignItems='center' gap={2} pt={4}>
                    <TimeIcon size='1.5em' />
                    <Text>{convertDateFormat(date)}</Text>
                </Flex>
                <Flex alignItems='center' gap={2} pt={4}>
                    <MoneyIcon size='1.5em' />
                    <Text>{price ? price + '€' : 'Free'}</Text>
                </Flex>
            </Flex>
            <Divider mt={4} bg='white' />
            <Flex
                justify={mode === 'offline' ? 'space-between' : 'flex-end'}
                align='center'
                pt={4}
                direction={{ base: 'column', md: 'row' }}
                w={{ base: 'full', md: 'auto' }}
                gap={4}
            >
                {mode === 'offline' && (
                    <Text fontSize='lg'>
                        <Highlight query='Adress:' styles={{ fontWeight: 'bold', color: 'white' }}>
                            Adress:
                        </Highlight>{' '}
                        {`${country}, ${city}, ${street}`}
                    </Text>
                )}
                <Button
                    colorScheme='brand'
                    color='text.white'
                    px='14'
                    as={ReactRouterLink}
                    to={apllyPath}
                    w={{ base: 'full', md: 'auto' }}
                >
                    Apply
                </Button>
            </Flex>
        </ChakraCardFooter>
    );
};

const CardPopover = ({
    eventId,
    removeEvent,
}: {
    eventId: string;
    removeEvent: (eventId: string) => void;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    if (!removeEvent) return null;

    return (
        <>
            <PopoverContent maxW='200px' right={70} bg='bg.default'>
                <PopoverBody display='flex' flexDirection='column' gap={3}>
                    <Button
                        w='100%'
                        to={`/events/edit/${eventId}`}
                        as={ReactRouterLink}
                        _hover={{ bg: 'brand.200' }}
                    >
                        Edit event
                    </Button>
                    <Button w='100%' _hover={{ bg: 'red.400' }} onClick={onOpen}>
                        Delete event
                    </Button>
                </PopoverBody>
            </PopoverContent>
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                removeEvent={() => removeEvent(eventId)}
            />
        </>
    );
};

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    cancelRef: React.RefObject<HTMLButtonElement>;
    removeEvent: () => void;
}

const Dialog = ({ isOpen, onClose, cancelRef, removeEvent }: DialogProps) => {
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Event
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to delete your event? This action cannot be undone.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={removeEvent} ml={3}>
                            Remove
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
