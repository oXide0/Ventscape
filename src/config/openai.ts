import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const generateResponse = async (content: string) => {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content }],
        stream: true,
    };
    const stream = await openai.chat.completions.create(params);
    let response = '';
    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices[0]?.delta?.content) {
            response += chunk.choices[0].delta.content;
        }
    }
    return response;
};

export { generateResponse };
