"use client";

import React, { useState, useEffect } from "react";
import { CardStack } from "@/app/components/ui/card-stack";
import { cn } from "@/app/lib/utils";

// Highlight component (same as before)
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

export default function LearnPage() {
  const [feedbacks, setFeedbacks] = useState<
    { _id: string; name: string; email: string; message: string }[]
  >([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch feedbacks on mount
  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch(() => setMessage("Failed to load feedbacks"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit feedback");
      }

      const newFeedback = await res.json();

      setFeedbacks((prev) => [newFeedback, ...prev]); // Add new feedback on top
      setFormData({ name: "", email: "", message: "" });
      setMessage("✅ Feedback submitted successfully!");
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Map feedbacks to cards with numeric id for CardStack
  const cards = feedbacks.map((fb, index) => ({
    id: index,
    name: fb.name,
    designation: fb.email,
    content: <p>{fb.message}</p>,
  }));

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Feedback & Reviews</h1>

      {/* CardStack ABOVE the form */}
      <div className="h-[40rem] flex items-center justify-center w-full">
        {cards.length > 0 ? (
          <CardStack items={cards} />
        ) : (
          <p className="text-gray-400 text-center">No feedback yet.</p>
        )}
      </div>

      {/* Feedback submission form BELOW */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-gray-700 p-6 rounded-lg bg-gray-900 text-white"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-green-500"
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-green-500 resize-y"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 py-3 rounded transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

        {message && (
          <p
            className={`mt-2 text-center ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

