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
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { memo, useRef } from 'react';
import { BiTime } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';
import { removeEventImg } from 'services/eventActions';
import { Event } from 'types/types';
import { convertDateFormat } from 'utils/events';

interface EventEditCardProps extends Event {
    onRemoveEvent: (id: string) => void;
}

const EditEventCard = memo((props: EventEditCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

    const removeEvent = () => {
        removeEventImg(props.img);
        props.onRemoveEvent(props.id);
        onClose();
    };

    return (
        <Box w='360px'>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Card p={4} rounded='md'>
                <Flex justify='between'>
                    <Flex gap='2'>
                        <BiTime color='indigo.600' size='1.5em' />
                        <Text fontWeight='semibold'>{convertDateFormat(props.date)}</Text>
                    </Flex>
                </Flex>
                <Box pt='1'>
                    <Text fontSize='xl' fontWeight='semibold'>
                        {props.name}
                    </Text>
                    <Text isTruncated>{props.about}</Text>
                </Box>
                <Flex pt='3' justify='space-between'>
                    <Button
                        as={ReactRouterLink}
                        to={`/events/edit/${props.id}`}
                        style={{ textDecoration: 'none', display: 'flex', gap: 3 }}
                        colorScheme='brand'
                        color='white'
                    >
                        <MdEdit />
                        Edit
                    </Button>
                    <Button
                        onClick={onOpen}
                        colorScheme='brand'
                        color='white'
                        style={{ display: 'flex', gap: 3 }}
                    >
                        <MdDelete />
                        Delete
                    </Button>
                </Flex>
            </Card>
        </Box>
    );
});

export default EditEventCard;
