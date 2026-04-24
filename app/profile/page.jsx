"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      setName(session?.user?.name || "");

      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/profile");
          if (!res.ok) return;
          const data = await res.json();
          if (data?.customName) {
            setName(data.customName);
          }
        } catch (err) {
          console.error("Failed to load profile:", err);
        }
      };

      fetchProfile();
    }
  }, [router, session, status]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter a valid name with at least 2 characters.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customName: trimmedName }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to update profile.");
        return;
      }

      setMessage("Profile updated successfully.");
      setName(data.customName || trimmedName);
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-10">
        My Account
      </h1>

      <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <img
            src={session?.user?.image || "/avatar-placeholder.png"}
            alt={session?.user?.name || "User Avatar"}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />

          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {name || session?.user?.name || "Your name"}
          </h2>

          <p className="text-gray-500 text-sm">{session?.user?.email}</p>

          <div className="w-full h-px bg-gray-200 my-6" />

          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-500 transition duration-200 font-medium"
          >
            <MdLogout className="text-lg" />
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Update Your Profile
          </h2>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter a new name..."
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-500 transition duration-200 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Update Profile"}
              <FaRegPaperPlane />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
