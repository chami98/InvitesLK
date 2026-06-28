import { CreateWeddingForm } from "@/components/CreateWeddingForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Wedding - Admin",
  robots: "noindex,nofollow",
};

export default function AdminCreateWeddingPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/admin"
          className="text-sm text-stone-400 transition hover:text-stone-700"
        >
          ← Back to Admin
        </Link>
      </div>

      {/* Form */}
      <CreateWeddingForm />
    </div>
  );
}
