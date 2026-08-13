"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, ArrowUpRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How do I book an appointment?",
  "Tell me about ceramic coating",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

// ─── Message bubble ────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
            : "rounded-2xl rounded-bl-md bg-muted text-foreground",
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-base font-bold mt-2 mb-1">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm font-bold mt-2 mb-1">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold mt-2 mb-1 text-primary">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-1 last:mb-0">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-primary">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="my-1 ml-4 list-disc space-y-0.5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-1 ml-4 list-decimal space-y-0.5">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-snug">{children}</li>
              ),
              hr: () => <hr className="my-2 border-border/40" />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <div className="flex h-3 items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: "950ms",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────

export function BuffAIChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [greeting] = React.useState(getGreeting);

  // Stable session and user IDs for the lifetime of this page load
  const sessionId = React.useRef<string>(crypto.randomUUID()).current;
  const userId = React.useRef<string>("guest").current;

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const showEmptyState = messages.length === 0;

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const reply = React.useCallback(
    async (text: string) => {
      setIsTyping(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, sessionId, userId }),
        });

        const data = await res.json();
        const content: string = res.ok
          ? (data.response ?? "")
          : (data.error ??
            "Something went wrong. Please try again or contact us directly.");

        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please try again or reach out to The Buff directly via WhatsApp.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, userId],
  );

  const sendMessage = React.useCallback(
    (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isTyping) return;

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content },
      ]);
      setInput("");
      reply(content);
    },
    [input, isTyping, reply],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <Card
        className={cn(
          "flex h-140 w-95 flex-col overflow-hidden border border-border/70 shadow-2xl transition-all duration-300 ease-in-out py-0 gap-0",
          isOpen
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-4 scale-95 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-3 border-b border-border/60 bg-background px-5 py-4">
          <Avatar className="size-10 shrink-0 border border-border">
            <AvatarImage
              src="/logo.png"
              alt="The Buff Detailing Logo"
              className="object-contain rounded-full"
              style={{
                objectFit: "contain",
                width: "2.5rem",
                height: "2.5rem",
                padding: "2px",
              }}
            />
            <AvatarFallback>
              <span className="font-bold text-xs">Buff</span>
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight">
                Buff AI
              </span>
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-400" />
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Ask about services, pricing, or hours
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="size-8 rounded-full"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="flex flex-1 flex-col overflow-hidden bg-background/40 p-0">
          {showEmptyState ? (
            <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-10 pb-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-primary/15 to-primary/5 text-primary">
                  <Sparkles className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {greeting}
                </h3>
                <p className="mt-1.5 max-w-65 text-sm leading-relaxed text-muted-foreground">
                  I&apos;m Buff AI — ask about services, pricing, timings, or
                  how booking works.
                </p>
              </div>

              <div className="mt-8">
                <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  Quick questions
                </p>
                <div className="flex flex-col gap-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="group flex items-center justify-between gap-2 rounded-xl bg-muted/40 px-3.5 py-2.5 text-left text-sm text-foreground/90 transition-colors hover:bg-muted"
                    >
                      <span>{q}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-smooth">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </CardContent>

        {/* Input */}
        <CardFooter className="border-t border-border/60 bg-background p-3">
          <div className="flex w-full items-center gap-2 rounded-full border border-border/70 bg-muted/40 py-1.5 pl-4 pr-1.5 transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Buff AI…"
              disabled={isTyping}
              className="h-9 flex-1 border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 bg-none!"
              aria-label="Type message"
              style={{ background: "none" }}
            />

            <Button
              size="icon"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="size-8 shrink-0 rounded-full"
            >
              {isTyping ? (
                <Spinner className="size-4" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Launcher */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "pointer-events-auto flex h-14 items-center gap-2.5 rounded-full border-none px-6 shadow-xl backdrop-blur-lg",
          isOpen && "scale-95 shadow-2xl ring ring-primary/30",
        )}
        aria-label={isOpen ? "Close Buff AI chat" : "Open Buff AI chat"}
      >
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-green-400" />
        </span>
        <span className="text-base font-semibold tracking-wide">
          {isOpen ? "Close chat" : "Chat with Buff AI"}
        </span>
      </Button>
    </div>
  );
}
