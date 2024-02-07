import {
    Box,
    Center,
    Highlight,
    Icon,
    IconButton,
    Image,
    Input,
    Text,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import { memo, useRef } from 'react';
import { CloseIcon, UploadIcon } from 'utils/icons';

interface ImageUploadProps {
    setFile: (file: File | null) => void;
    imgUrl: string | null | undefined;
}

const ImageUpload = memo(({ setFile, imgUrl }: ImageUploadProps) => {
    const filePicker = useRef<HTMLInputElement>(null);
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    const handlePick = () => {
        if (!imgUrl) filePicker.current?.click();
    };

    const onEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file);
    };

    const removeFile = () => {
        setFile(null);
    };

    return (
        <Box pt={5}>
            <Text as='label' htmlFor='file-upload' fontSize='sm' fontWeight='medium' lineHeight={6}>
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
                cursor={!imgUrl ? 'pointer' : 'default'}
                onClick={handlePick}>
                <VStack spacing={4} pos='relative'>
                    {imgUrl ? (
                        <>
                            <IconButton
                                aria-label='remove'
                                onClick={removeFile}
                                variant='unstyled'
                                pos='absolute'
                                right={-2}
                                top={-1}>
                                <CloseIcon size='2em' />
                            </IconButton>
                            <Image src={imgUrl} alt='event-preview' maxH='80' borderRadius='md' />
                        </>
                    ) : (
                        <Icon as={UploadIcon} w={12} h={12} color={textColor} />
                    )}
                    <Box
                        as='label'
                        cursor='pointer'
                        fontSize='inherit'
                        color='indigo.400'
                        _hover={{ color: 'indigo.500' }}
                        _focusWithin={{ ring: 2, ringColor: 'indigo.600' }}>
                        <Input
                            // data-testid='file-upload'
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
                            styles={{ color: '#6B8FFF', fontWeight: 'bold' }}>
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
});

export default ImageUpload;
