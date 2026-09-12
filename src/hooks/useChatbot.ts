import { useState, useCallback } from 'react';

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

const WELCOME =
    "Hey — I'm Dani. Ask about Enverus, Backtes.to, T-Mobile, or anything else on my CV.";

export function useChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: WELCOME,
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        const trimmed = content.trim();
        const userMessage: Message = {
            id: Date.now().toString(),
            content: trimmed,
            role: 'user',
            timestamp: new Date(),
        };

        const historyPayload = messages
            .filter((m) => m.id !== '1')
            .map((m) => ({ role: m.role, content: m.content }));

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: trimmed,
                    history: historyPayload,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            const aiResponse = data.response || 'Sorry, I could not generate a response.';

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    content: aiResponse,
                    role: 'assistant',
                    timestamp: new Date(),
                },
            ]);
        } catch (err) {
            console.error('Chat error:', err);
            setError('Sorry, I encountered an error. Please try again.');
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    content: 'Hmm, that one failed — try again in a sec.',
                    role: 'assistant',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const clearMessages = useCallback(() => {
        setMessages([
            {
                id: '1',
                content: WELCOME,
                role: 'assistant',
                timestamp: new Date(),
            },
        ]);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
    };
}

