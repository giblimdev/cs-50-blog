"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProfessional } from "@/hooks/useProfessional";
import { Button } from "@/components/ui/button";
import { RocketIcon, HomeIcon } from "lucide-react";

export default function GoodbyePage() {
  const router = useRouter();
  const { reset } = useProfessional();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleReconnect = () => {
    router.push("/auth/sign-in");
  };

  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const getMessage = () => {
    switch (reason) {
      case "session_expired":
        return "Your session has expired for security reasons.";
      case "inactivity":
        return "You've been logged out due to inactivity.";
      default:
        return "You've been successfully logged out.";
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-teal-500 to-coral-500 flex items-center justify-center p-4">
      <div className="max-w-lg w-full mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl text-center space-y-8 transition-all duration-500 hover:shadow-3xl">
        <div className="relative">
          <RocketIcon className="w-16 h-16 mx-auto text-coral-500 animate-bounce relative z-10" />
        </div>

        <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">
          Goodbye!
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          {getMessage()} <br />
          Come back anytime!
        </p>

        <div className="pt-6 space-y-4">
          <Button
            size="lg"
            className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handleReconnect}
          >
            <RocketIcon className="w-5 h-5" />
            Sign In Again
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full border-2 border-teal-500 text-teal-600 text-lg font-semibold py-3 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handleGoHome}
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
