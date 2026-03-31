"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { User } from "next-auth";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import router from "next/router";
import { useRouter } from "next/navigation"; 

const page = () => {
  const router=useRouter()
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  // 🔥 Fetch Messages
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);

      if (refresh) toast.success("Messages refreshed 🚀");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch messages",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔥 Fetch toggle state
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      toast.error("Failed to fetch settings");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  useEffect(() => {
    if (!session?.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session]);

  // 🔥 Toggle handler
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to update setting");
    }
  };

  if (!session?.user) return null;

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 mt-5">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 text-sm">
              Manage your messages & profile
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => router.push(`/u/${username}`)}
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 cursor-pointer"
            >
              Send Message
            </Button>

            <Button
              onClick={() => fetchMessages(true)}
              disabled={isLoading}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCcw className="w-4 h-4" />
              )}
              Refresh
            </Button>
          </div>
          {/* <Button
            type="button"
            onClick={() => router.push(`/u/${username}`)}
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 cursor-pointer"
          >
            Send Message 🚀
          </Button>
          <Button
            onClick={() => fetchMessages(true)}
            disabled={isLoading}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCcw className="w-4 h-4" />
            )}
            Refresh
          </Button> */}
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 rounded-2xl border border-zinc-700 shadow-lg hover:shadow-blue-500/10 transition flex justify-between items-center">
          <div>
            <p className="text-xs text-zinc-400">Your Public Link</p>
            <p className="text-sm break-all text-zinc-200">{profileUrl}</p>
          </div>

          <Button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Copy
          </Button>
        </div>

        {/* Toggle */}
        <div className="bg-zinc-900/80 backdrop-blur p-5 rounded-2xl border border-zinc-800 shadow-md flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Accept Messages</p>
            <p className="text-sm text-zinc-500">
              Enable or disable receiving messages
            </p>
          </div>

          {isSwitchLoading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <Switch
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              className="data-[state=checked]:bg-green-500"
            />
          )}
        </div>

        {/* Messages */}
        <div className="bg-zinc-900/80 backdrop-blur p-5 rounded-2xl border border-zinc-800 shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages</h2>
            <span className="text-xs text-zinc-500">
              {messages.length} total
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-center text-zinc-500 py-10">
              No messages yet 🚀
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id.toString()}
                  className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 flex justify-between items-center hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition"
                >
                  <p className="text-sm text-zinc-200">{msg.content}</p>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setMessages(
                        messages.filter(
                          (m) => m._id.toString() !== msg._id.toString(),
                        ),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
