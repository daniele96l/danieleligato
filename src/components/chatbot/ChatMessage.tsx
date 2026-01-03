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
                'flex gap-2 md:gap-3 mb-3 md:mb-4 animate-in fade-in slide-in-from-bottom-2',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            <Avatar className="h-7 w-7 md:h-8 md:w-8 shrink-0">
                {isUser ? (
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        U
                    </AvatarFallback>
                ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-xs">
                        D
                    </AvatarFallback>
                )}
            </Avatar>

            <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
                <div
                    className={cn(
                        'rounded-2xl px-3 py-2 md:px-4 md:py-2.5 max-w-[85%] shadow-sm',
                        isUser
                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                            : 'bg-muted text-foreground rounded-tl-sm'
                    )}
                >
                    <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}
