'use client';
import React from 'react';

const ContactUs: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your submission logic here (e.g., API call, toast, etc.)
    alert('Form submitted!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
      <p className="text-lg text-gray-400 text-center mb-8">
        Have questions about our class scheduling solution, or want to partner with us? We'd love to hear from you.
        Fill out the form below, and our team will get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="p-3 border border-gray-300 rounded-md min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
