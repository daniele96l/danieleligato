import { useState, useCallback } from 'react';

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export function useChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm Dani 👋 Ask me anything about my experience, projects, or skills!",
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: content.trim(),
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            // Call our backend API instead of OpenAI directly
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: content }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            const aiResponse = data.response || 'Sorry, I could not generate a response.';

            // Add assistant response
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: aiResponse,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setError('Sorry, I encountered an error. Please try again.');

            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: 'Sorry, I encountered an error. Please try again! 😅',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([
            {
                id: '1',
                content: "Hi! I'm Dani 👋 Ask me anything about my experience, projects, or skills!",
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
