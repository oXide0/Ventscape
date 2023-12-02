import { Stack } from '@chakra-ui/react';
import AIChat from 'components/AIChat';
import PageLayout from 'components/ui/PageLayout';
import { generateResponse } from 'config/openai';
import { useSubmitting } from 'hooks/useSubmitting';
import { useEffect, useState } from 'react';
import { Message } from 'types/types';
import { useFetching } from 'hooks/useFetching';
import { getUserAvatar } from 'services/userActions';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/userSlice';

const AiPage = () => {
    const { id, name } = useAppSelector(selectUser);
    const [messages, setMessages] = useState<Message[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const { fetch } = useFetching(async () => {
        const response = await getUserAvatar(id);
        setAvatarUrl(response);
    });

    const { submit, isSubmitting } = useSubmitting(async (content: string) => {
        setMessages((messages) => [...messages, { author: name, content }]);
        const response = await generateResponse(content);
        setMessages((messages) => [...messages, { author: 'AI', content: response }]);
    });

    useEffect(() => {
        fetch();
    });

    return (
        <PageLayout heading='AI Chat'>
            <AIChat
                messages={messages}
                onSend={submit}
                isLoading={isSubmitting}
                avatarUrl={avatarUrl}
            />
            <Stack h={20} bg='bg.default' pos='fixed' w='100%' left={0} bottom={0}></Stack>
        </PageLayout>
    );
};

export default AiPage;
