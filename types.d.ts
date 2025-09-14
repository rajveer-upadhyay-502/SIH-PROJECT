import mongoose from "mongoose";

declare global {
  // Avoids TypeScript redeclaration errors in Next.js hot reload
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {};
