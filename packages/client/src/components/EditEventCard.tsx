import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { memo, useEffect, useRef, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getEventImg, removeEventImg } from 'services/eventActions';
import { Event } from 'types/types';
import { convertDateFormat, truncateDescription } from 'utils/events';

interface EventEditCardProps extends Event {
    bgColor?: 'default' | 'navbar';
    showActions?: boolean;
    onRemoveEvent: (id: string) => void;
}

const EditEventCard = memo(
    ({ bgColor = 'navbar', showActions = true, ...props }: EventEditCardProps) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = useRef<HTMLButtonElement>(null);
        const [imgUrl, setImgUrl] = useState<string>('');

        const removeEvent = () => {
            removeEventImg(props.img);
            props.onRemoveEvent(props.id);
            onClose();
        };

        useEffect(() => {
            const getImg = async () => {
                const img = await getEventImg(props.img);
                if (img) setImgUrl(img);
            };
            getImg();
        }, []);

        return (
            <Box maxW='360px'>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Event
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure you want to delete your event? This action cannot be
                                undone.
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

                <Card rounded='md' bg={bgColor === 'default' ? 'bg.default' : 'bg.navbar'}>
                    {imgUrl && <Image src={imgUrl} roundedTop='md' h='52' objectFit='cover' />}
                    <Stack p={2}>
                        <Flex justify='between'>
                            <Flex gap='2'>
                                <BiTime color='indigo.600' size='1.5em' />
                                <Text fontWeight='semibold'>{convertDateFormat(props.date)}</Text>
                            </Flex>
                        </Flex>
                        <Heading size='lg'>{props.name}</Heading>
                        <Text>{truncateDescription(props.about)}</Text>
                        {showActions && (
                            <Flex justify='space-between' pt={2}>
                                <Button
                                    bg='brand.100'
                                    _hover={{ bg: 'brand.200' }}
                                    color='white'
                                    display='flex'
                                    gap={1}
                                    to={`/events/edit/${props.id}`}
                                    as={ReactRouterLink}
                                    w={110}
                                >
                                    <MdEdit />
                                    Edit
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={onOpen}
                                    display='flex'
                                    gap={1}
                                    w={110}
                                >
                                    <MdDelete />
                                    Remove
                                </Button>
                            </Flex>
                        )}
                    </Stack>
                </Card>
            </Box>
        );
    }
);

export default EditEventCard;
