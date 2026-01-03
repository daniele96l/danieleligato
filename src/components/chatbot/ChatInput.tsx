import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({
    onSend,
    disabled = false,
    placeholder = 'Type your message...',
}: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex gap-2 items-end p-3 md:p-4 border-t bg-background">
            <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="min-h-[40px] md:min-h-[44px] max-h-[100px] md:max-h-[120px] resize-none text-sm"
                rows={1}
            />
            <Button
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                size="icon"
                className="h-[40px] w-[40px] md:h-[44px] md:w-[44px] shrink-0"
            >
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
}
