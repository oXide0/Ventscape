import {
    Box,
    Text,
    VStack,
    Image,
    useColorModeValue,
    Input,
    Icon,
    Center,
    Highlight,
    IconButton,
} from '@chakra-ui/react';
import { useRef, memo } from 'react';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ImageUploadProps {
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onEventFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    removeFile: () => void;
    imgUrl: string | null | undefined;
}

const ImageUpload = memo(
    ({ handleDragOver, handleDrop, onEventFileChange, removeFile, imgUrl }: ImageUploadProps) => {
        const filePicker = useRef<HTMLInputElement>(null);
        const borderColor = useColorModeValue('gray.300', 'gray.600');
        const textColor = useColorModeValue('gray.600', 'gray.200');

        const handlePick = () => {
            if (!imgUrl) filePicker.current?.click();
        };

        return (
            <Box pt={5} className='col-span-full'>
                <Text
                    as='label'
                    htmlFor='file-upload'
                    fontSize='sm'
                    fontWeight='medium'
                    lineHeight={6}
                >
                    Cover photo
                </Text>
                <Center
                    mt={2}
                    p={10}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    borderStyle='dashed'
                    borderWidth='2px'
                    borderColor={borderColor}
                    borderRadius='lg'
                    cursor={imgUrl === '' ? 'pointer' : 'default'}
                    onClick={handlePick}
                >
                    <VStack spacing={4} pos='relative'>
                        {imgUrl ? (
                            <>
                                <IconButton
                                    aria-label='remove'
                                    onClick={removeFile}
                                    variant='unstyled'
                                    pos='absolute'
                                    right={-2}
                                    top={-1}
                                >
                                    <AiOutlineCloseCircle size='2em' />
                                </IconButton>
                                <Image
                                    src={imgUrl}
                                    alt='event-preview'
                                    maxH='80'
                                    borderRadius='md'
                                />
                            </>
                        ) : (
                            <Icon as={FiUpload} w={12} h={12} color={textColor} />
                        )}
                        <Box
                            as='label'
                            cursor='pointer'
                            fontSize='inherit'
                            color='indigo.400'
                            _hover={{ color: 'indigo.500' }}
                            _focusWithin={{ ring: 2, ringColor: 'indigo.600' }}
                        >
                            <Input
                                ref={filePicker}
                                id='file-upload'
                                name='file-upload'
                                type='file'
                                accept='image/*,.png,.jpg,.gif'
                                onChange={onEventFileChange}
                                size='sm'
                                visibility='hidden'
                                position='absolute'
                                width='0'
                                height='0'
                                opacity={0}
                            />
                        </Box>
                        <Text fontSize='sm' color={textColor}>
                            <Highlight
                                query='Upload a file'
                                styles={{ color: '#6B8FFF', fontWeight: 'bold' }}
                            >
                                Upload a file or drag and drop
                            </Highlight>
                        </Text>
                        <Text fontSize='xs' color={textColor}>
                            PNG, JPG, GIF up to 10MB
                        </Text>
                    </VStack>
                </Center>
            </Box>
        );
    }
);

export default ImageUpload;
