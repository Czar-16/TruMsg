"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";

export default function SendMessagePage() {
  const { username } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 🔥 SEND MESSAGE
  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: message,
      });

      toast.success(response.data.message);
      setMessage("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  // 🤖 AI SUGGESTIONS
  const fetchSuggestions = async () => {
    setAiLoading(true);

    try {
      const response = await fetch("/api/suggest-messages", {
        method: "POST",
      });

      // ✅ handle API failure
      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      if (!data.message) {
        throw new Error("No suggestions received");
      }

      const parsed = data.message
        .split("||")
        .map((q: string) => q.trim())
        .filter((q: string) => q.length > 0);

      setSuggestions(parsed);

      toast.success("AI suggestions ready ✨");
    } catch (error) {
      toast.error("Failed to generate suggestions");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-2xl space-y-8 bg-zinc-900/80 backdrop-blur-lg p-10 rounded-3xl border border-zinc-800 shadow-2xl">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Send Anonymous Message 💬
          </h1>
          <p className="text-zinc-400 text-sm">Say anything. Stay anonymous.</p>
        </div>

        {/* Input */}
        <Input
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 h-12 text-base"
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>

        {/* AI Button */}
        <Button
          onClick={fetchSuggestions}
          disabled={aiLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 h-12 text-base flex items-center justify-center gap-2"
        >
          {aiLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate AI Messages
        </Button>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">Suggestions:</p>

            {suggestions.map((q, i) => (
              <div
                key={i}
                onClick={() => {
                  setMessage(q);
                  toast.success("Added to input ✨");
                }}
                className="bg-zinc-800 p-4 rounded-xl cursor-pointer hover:bg-zinc-700 transition text-sm border border-zinc-700 hover:border-purple-500"
              >
                {q}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
