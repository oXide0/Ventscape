import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Highlight,
    IconButton,
    Image,
    Text,
} from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { useFetching } from 'hooks/useFetching';
import { memo, useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { HiStatusOnline } from 'react-icons/hi';
import { RiMoneyEuroCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { getEventImg } from 'services/eventActions';
import { getUserAvatar, getUserById } from 'services/userActions';
import { Event, User } from 'types/types';
import { convertDateFormat } from 'utils/events';

const EventCard = memo((event: Event) => {
    const [creator, setCreator] = useState<User>();
    const [avatar, setAvatar] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const userData = useAppSelector(selectUser);
    const navigate = useNavigate();
    const apllyPath = userData.isAuth ? event.link : '/login';

    const { fetch } = useFetching(async () => {
        const userServerData = await getUserById(event.creatorId);
        const img = await getEventImg(event.img);
        const avatar = await getUserAvatar(event.creatorId);
        if (avatar) setAvatar(avatar);
        if (img) setImgUrl(img);
        if (userServerData) setCreator(userServerData);
    });

    const onAvatarClick = () => {
        navigate(`/user/${event.creatorId}`);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Card w='full' h='auto'>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar src={avatar} cursor='pointer' onClick={onAvatarClick} />
                        <Box>
                            <Heading size='sm'>{creator?.name}</Heading>
                            <Text>Creator, {creator?.name}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            {imgUrl && <Image objectFit='cover' src={imgUrl} alt='event-image' />}
            <CardBody>
                <Heading size='lg'>{event.name}</Heading>
                <Text pt={1}>{event.about}</Text>
            </CardBody>
            <CardFooter flexDir='column'>
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
                    {event.mode === 'offline' ? (
                        <Flex alignItems='center' gap={2} pt={4}>
                            <FaLocationDot size='1.5em' />
                            <Text>{event.city}</Text>
                        </Flex>
                    ) : (
                        <Flex alignItems='center' gap={2} pt={4}>
                            <HiStatusOnline size='1.5em' />
                            <Text>Online</Text>
                        </Flex>
                    )}
                    <Flex alignItems='center' gap={2} pt={4}>
                        <BiTime size='1.5em' />
                        <Text>{convertDateFormat(event.date)}</Text>
                    </Flex>
                    <Flex alignItems='center' gap={2} pt={4}>
                        <RiMoneyEuroCircleLine size='1.5em' />
                        <Text>{event.price ? event.price + '€' : 'Free'}</Text>
                    </Flex>
                </Flex>
                <Divider mt={4} bg='white' />
                <Flex
                    justify={event.mode === 'offline' ? 'space-between' : 'flex-end'}
                    align='center'
                    pt={4}
                    direction={{ base: 'column', md: 'row' }}
                    w={{ base: 'full', md: 'auto' }}
                    gap={4}
                >
                    {event.mode === 'offline' && (
                        <Text fontSize='lg'>
                            <Highlight
                                query='Adress:'
                                styles={{ fontWeight: 'bold', color: 'white' }}
                            >
                                Adress:
                            </Highlight>{' '}
                            {`${event.country}, ${event.city}, ${event.street}`}
                        </Text>
                    )}
                    <Button
                        colorScheme='brand'
                        color='text.white'
                        px='14'
                        as={Link}
                        to={apllyPath}
                        w={{ base: 'full', md: 'auto' }}
                    >
                        Apply
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
});

export default EventCard;
