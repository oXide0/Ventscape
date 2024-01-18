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
import { memo, useRef, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IEvent } from 'types/types';
import { convertDateFormat, truncateDescription } from 'utils/events';
import { DeleteIcon, EditIcon, TimeIcon } from 'utils/icons';

interface EditEventCardProps extends IEvent {
    bgColor?: 'default' | 'navbar';
    showActions?: boolean;
    onRemoveEvent: (id: string) => void;
}

const EditEventCard = memo(
    ({ bgColor = 'navbar', showActions = true, ...props }: EditEventCardProps) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = useRef<HTMLButtonElement>(null);
        const [imgUrl, setImgUrl] = useState<string>('');

        const removeEvent = () => {
            props.onRemoveEvent(props.id);
            onClose();
        };

        return (
            <Box minW='360px'>
                <Dialog
                    isOpen={isOpen}
                    onClose={onClose}
                    cancelRef={cancelRef}
                    removeEvent={removeEvent}
                />
                <Card rounded='md' bg={bgColor === 'default' ? 'bg.default' : 'bg.navbar'}>
                    {imgUrl && <Image src={imgUrl} roundedTop='md' h='52' objectFit='cover' />}
                    <Stack p={2}>
                        <Flex justify='between'>
                            <Flex gap='2'>
                                <TimeIcon color='indigo.600' size='1.5em' />
                                <Text fontWeight='semibold'>{convertDateFormat(props.date)}</Text>
                            </Flex>
                        </Flex>
                        <Heading size='lg'>{props.title}</Heading>
                        <Text>{truncateDescription(props.description)}</Text>
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
                                    <EditIcon />
                                    Edit
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={onOpen}
                                    display='flex'
                                    gap={1}
                                    w={110}
                                >
                                    <DeleteIcon />
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
