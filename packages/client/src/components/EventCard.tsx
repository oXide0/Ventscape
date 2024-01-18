import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter as ChakraCardFooter,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Text,
    Button,
    Divider,
    Highlight,
} from '@chakra-ui/react';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { memo } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from 'services/userApi';
import { IEvent } from 'types/types';
import { convertDateFormat } from 'utils/events';
import { DotsIcon, LocationIcon, OnlineIcon, MoneyIcon, TimeIcon } from 'utils/icons';

const EventCard = memo((event: IEvent) => {
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
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<DotsIcon />}
                    />
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
