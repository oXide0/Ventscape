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
import { useFetching } from 'hooks/useFetching';
import { memo, useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { HiStatusOnline } from 'react-icons/hi';
import { RiMoneyEuroCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getEventImg } from 'services/eventActions';
import { getUserById } from 'services/userActions';
import { Event, User } from 'types/types';
import { convertDateFormat } from 'utils/events';

const EventCard = memo((event: Event) => {
    const [user, setUser] = useState<User>();
    const [imgUrl, setImgUrl] = useState<string>('');
    const navigate = useNavigate();

    const { fetch } = useFetching(async () => {
        const userData = await getUserById(event.creatorId);
        const img = await getEventImg(event.img);
        if (img) setImgUrl(img);
        if (userData) setUser(userData);
    });

    useEffect(() => {
        fetch();
    }, []);

    const onApply = () => {
        navigate(event.link);
    };

    return (
        <Card w='full' maxW='2xl' h='auto'>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={user?.name} src={user?.avatar} />
                        <Box>
                            <Heading size='sm'>{user?.name}</Heading>
                            <Text>Creator, {user?.name}</Text>
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
                    <Button colorScheme='brand' color='text.white' px='14' onClick={onApply}>
                        Apply
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
});

export default EventCard;
