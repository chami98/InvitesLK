import { CreateWeddingForm } from "@/components/CreateWeddingForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Wedding - InvitesLK",
  description: "Create a new wedding invitation",
};

export default function CreateWeddingPage() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-stone-50 to-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-stone-400 transition hover:text-stone-700"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
            Create Your Wedding
          </h1>
          <p className="mt-2 text-base text-stone-600">
            Build a beautiful digital invitation in minutes
          </p>
        </div>

        {/* Form */}
        <CreateWeddingForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-stone-500">
          <p>
            Need help?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              View examples
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
