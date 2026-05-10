"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ChatInputProps {
  disabled: boolean;
  onSend: (text: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export function ChatInput({ disabled, onSend, onTyping, onStopTyping }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");
    onStopTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="glass mt-3 flex items-center gap-2 rounded-lg p-2.5">
      <Input
        ref={inputRef}
        value={value}
        disabled={disabled}
        placeholder={disabled ? "Waiting for match..." : "Type your message..."}
        onChange={(event) => {
          setValue(event.target.value);
          if (event.target.value.trim()) onTyping();
          if (!event.target.value.trim()) onStopTyping();
        }}
        onBlur={onStopTyping}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
          }
        }}
      />
      <Button
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="h-12 w-12 p-0"
      >
        <SendHorizontal size={18} />
      </Button>
    </form>
  );
}
