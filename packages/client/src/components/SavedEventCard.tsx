import { Card, Heading, IconButton } from '@chakra-ui/react';
import { useSavedEvent } from 'hooks/useSavedEvent';
import { memo } from 'react';
import { IGetSavedEventsResponse } from 'services/eventApi';
import { SaveFillIcon, SaveIcon } from 'utils/icons';

const SavedEventCard = memo((data: IGetSavedEventsResponse) => {
    const { handleSaveEvent, isSavedEvent } = useSavedEvent(data.event.id);

    return (
        <Card
            w='full'
            bg='bg.default'
            p={4}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
        >
            <Heading fontSize='xl'>{data.event.title}</Heading>
            <IconButton
                aria-label='Save event'
                icon={isSavedEvent ? <SaveFillIcon /> : <SaveIcon />}
                onClick={handleSaveEvent}
            />
        </Card>
    );
});

export default SavedEventCard;
