"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function Chatbot({ onContactFormReady }: { onContactFormReady?: (data: ContactFormData) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm JJ's AI assistant. Ask me anything about Jeffrey's skills, experience, projects, certifications, or education! If you're interested in working with JJ, I can help get you connected.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      const responseText: string = data.response || "";

      const contactFormMatch = responseText.match(
        /\[CONTACT_FORM\]\s*(\{[\s\S]*?\})\s*\[\/CONTACT_FORM\]/
      );

      let cleanResponse = responseText;
      if (contactFormMatch) {
        cleanResponse = responseText
          .replace(/\[CONTACT_FORM\]\s*\{[\s\S]*?\}\s*\[\/CONTACT_FORM\]/, "")
          .trim();

        try {
          const formData: ContactFormData = JSON.parse(contactFormMatch[1]);
          if (formData.name && formData.email && formData.message) {
            onContactFormReady?.(formData);
          }
        } catch (err) {
          console.error("Failed to parse contact form data:", err);
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanResponse || "I've prepared a contact form for you below. Please review your details and send when ready!" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-[380px] h-[500px] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Ask JJ&apos;s AI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-full ${
                        message.role === "user"
                          ? "bg-primary/20"
                          : "gradient-bg"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-primary/10 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 rounded-full gradient-bg">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                        <span
                          className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, services..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="gradient-bg text-white hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full gradient-bg text-white shadow-lg hover:opacity-90 transition-opacity glow-cyan"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </>
  );
}
