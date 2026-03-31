"use client";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovingBorderCard } from "@/components/ui/moving-border";
import Autoplay from "embla-carousel-autoplay";

import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      {/* Beams */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />

      <main className="relative z-10 flex-grow flex flex-col items-center w-full px-4 md:px-24 py-16 mt-50">
        {/* Hero */}
        <section className="text-center mb-16 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Honest Feedback. Zero Identity.
          </h1>

          <p className="mt-4 text-zinc-400 text-base md:text-lg">
            TruMsg lets people share what they really think — without fear.
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Used by students, creators & teams.
          </p>

          <div className="mt-6">
            <Link href="/sign-up">
              <Button className="bg-blue-800 text-white hover:bg-blue-900 cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            What People Are Saying
          </h2>
          <p className="text-zinc-500 text-sm">Real anonymous messages</p>
        </div>

        {/* Carousel */}
        <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="basis-full flex justify-center px-4"
              >
                <div className="w-full max-w-2xl ml-15">
                  <MovingBorderCard>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg md:text-xl ">
                        {message.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-start gap-4 p-0">
                      <Mail className="text-zinc-400 mt-1" />

                      <div>
                        <p className="text-zinc-200 text-base md:text-lg leading-relaxed">
                          {message.content}
                        </p>

                        <p className="text-xs text-zinc-400 mt-3">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </MovingBorderCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <p className="text-zinc-600 text-sm mt-6 text-center">
          New anonymous messages appear every few seconds...
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 border-t border-zinc-800 text-zinc-500">
        © 2026 TruMsg. Built for honesty.
      </footer>
    </div>
  );
}
