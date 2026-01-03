import React from 'react';
import { Message } from '@/hooks/useChatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            <Avatar className="h-8 w-8 shrink-0">
                {isUser ? (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        U
                    </AvatarFallback>
                ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                        D
                    </AvatarFallback>
                )}
            </Avatar>

            <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
                <div
                    className={cn(
                        'rounded-2xl px-4 py-2.5 max-w-[85%] shadow-sm',
                        isUser
                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                            : 'bg-muted text-foreground rounded-tl-sm'
                    )}
                >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}
