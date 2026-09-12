import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { cn } from '@/lib/utils';

export function RagChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage } = useChatbot();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg',
                    'bg-foreground text-background hover:bg-foreground/90',
                    'transition-all duration-300 ease-in-out',
                    'hover:scale-105 focus:scale-105',
                    'z-[9999]',
                    isOpen && 'scale-95'
                )}
                size="icon"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <X className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                )}
            </Button>

            <Card
                className={cn(
                    'fixed inset-x-4 bottom-20 md:bottom-24 md:right-6 md:left-auto md:w-[380px]',
                    'h-[calc(100vh-8rem)] md:h-[600px] max-h-[600px]',
                    'shadow-2xl border border-border',
                    'transition-all duration-300 ease-in-out',
                    'z-[9999] flex flex-col',
                    'bg-background',
                    isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                )}
            >
                <div className="flex items-center justify-between p-3 md:p-4 border-b border-border bg-foreground text-background">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-background/15 flex items-center justify-center">
                            <span className="text-lg md:text-xl font-bold">D</span>
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base font-semibold">Ask Dani</h3>
                            <p className="text-xs text-background/70">About CV & portfolio</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-background hover:bg-background/15 h-8 w-8 md:h-10 md:w-10"
                    >
                        <X className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 p-3 md:p-4">
                    <div className="space-y-3 md:space-y-4">
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}

                        {isLoading && (
                            <div className="flex gap-2 md:gap-3 mb-4">
                                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
                                    <span className="text-xs font-semibold text-background">D</span>
                                </div>
                                <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-3 flex items-center gap-1">
                                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin text-muted-foreground" />
                                    <span className="text-xs md:text-sm text-muted-foreground">Thinking...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                <ChatInput
                    onSend={sendMessage}
                    disabled={isLoading}
                    placeholder="Ask about experience, skills..."
                />
            </Card>
        </>
    );
}
