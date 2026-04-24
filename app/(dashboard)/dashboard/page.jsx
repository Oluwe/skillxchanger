"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [commentModalSkill, setCommentModalSkill] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchSkills();
    }
  }, [status, session]);

  const normalizeEmail = (email) =>
    typeof email === "string" ? email.toLowerCase().trim() : "";

  const isUserOwner = (skillEmail, userEmail) =>
    normalizeEmail(skillEmail) === normalizeEmail(userEmail);

  const isSkillLikedByCurrentUser = (likedBy = [], userEmail) => {
    const normalizedUserEmail = normalizeEmail(userEmail);
    return normalizedUserEmail
      ? likedBy.some((email) => normalizeEmail(email) === normalizedUserEmail)
      : false;
  };

  const parseJsonResponse = async (res) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn("Response was not valid JSON:", text);
      return null;
    }
  };

  useEffect(() => {
    if (!successMessage && !actionError) return;

    const timer = window.setTimeout(() => {
      setSuccessMessage(null);
      setActionError(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [successMessage, actionError]);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await parseJsonResponse(res);
      if (!res.ok || !Array.isArray(data)) {
        console.error("Failed to fetch skills:", data || res.statusText);
        setSkills([]);
      } else {
        setSkills(data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    const confirmed = window.confirm("Delete this skill? This action cannot be undone.");
    if (!confirmed) return;

    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: "DELETE",
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        setActionError(data?.error || res.statusText || "Unable to delete skill.");
        return;
      }
      setSkills((current) => current.filter((skill) => skill.id !== skillId));
      setSuccessMessage("Skill deleted successfully.");
    } catch (error) {
      console.error("Error deleting skill:", error);
      setActionError("Unable to delete skill. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleLike = async (skillId) => {
    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        setActionError(data?.error || res.statusText || "Unable to update like.");
        return;
      }

      setSkills((current) =>
        current.map((skill) =>
          skill.id === skillId
            ? { ...skill, likes: data.likes, likedBy: data.likedBy }
            : skill,
        ),
      );
      const userLiked = isSkillLikedByCurrentUser(data.likedBy, session?.user?.email);
      setSuccessMessage(userLiked ? "Skill liked." : "Like removed.");
    } catch (error) {
      console.error("Error liking skill:", error);
      setActionError("Unable to update like. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenComments = (skill) => {
    setCommentModalSkill(skill);
    setCommentText("");
    setActionError(null);
    setSuccessMessage(null);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const trimmedComment = commentText.trim();

    if (!trimmedComment) {
      setActionError("Please enter a comment before submitting.");
      return;
    }

    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`/api/skills/${commentModalSkill.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", comment: trimmedComment }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        setActionError(data?.error || res.statusText || "Unable to submit comment.");
        return;
      }

      const updatedSkill = {
        ...commentModalSkill,
        commentCount: data.commentCount,
        comments: data.comments,
      };

      setSkills((current) =>
        current.map((skill) =>
          skill.id === commentModalSkill.id ? updatedSkill : skill,
        ),
      );
      setCommentModalSkill(updatedSkill);
      setSuccessMessage("Comment posted.");
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
      setActionError("Unable to post comment. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const uniqueCategories = [
    ...new Set(skills.map((s) => s.category).filter(Boolean)),
  ];

  const filteredSkills = skills.filter((skill) => {
    const typeMatch = filterType === "all" || skill.type === filterType;
    const categoryMatch =
      filterCategory === "all" || skill.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  if (status === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Available Skills</h2>

          {(successMessage || actionError) && (
            <div className="mb-6 rounded-3xl border border-white/80 bg-white/90 px-5 py-4 text-sm leading-6 shadow-xl backdrop-blur-sm transition-all duration-300">
              {successMessage ? (
                <div className="text-green-700 bg-green-50/80 border border-green-200/60 rounded-2xl px-4 py-3 backdrop-blur-sm">
                  {successMessage}
                </div>
              ) : (
                <div className="text-red-700 bg-red-50/80 border border-red-200/60 rounded-2xl px-4 py-3 backdrop-blur-sm">
                  {actionError}
                </div>
              )}
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm ${
                filterType === "all"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sky-200"
                  : "bg-white/80 text-slate-700 border border-white/60 hover:bg-white/90 hover:shadow-xl"
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setFilterType("offer")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm ${
                filterType === "offer"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-200"
                  : "bg-white/80 text-slate-700 border border-white/60 hover:bg-white/90 hover:shadow-xl"
              }`}
            >
              Offering
            </button>
            <button
              onClick={() => setFilterType("wanted")}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm ${
                filterType === "wanted"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-violet-200"
                  : "bg-white/80 text-slate-700 border border-white/60 hover:bg-white/90 hover:shadow-xl"
              }`}
            >
              Requesting
            </button>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-6 py-3 border border-white/60 rounded-2xl focus:ring-2 focus:ring-sky-300 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills Dashboard */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 bg-white/80 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-sm">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-sky-500 border-t-transparent"></div>
              <p className="text-slate-600 font-medium">Loading skills...</p>
            </div>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12 bg-white/90 rounded-3xl border border-white/60 shadow-xl backdrop-blur-sm">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-slate-600 text-lg font-medium mb-4">
                No skills found. Be the first to post!
              </p>
              <Link
                href="/post-skill"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Post a skill →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white/90 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/60 backdrop-blur-sm group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800 flex-1 group-hover:text-sky-600 transition-colors">
                    {skill.skillName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 shadow-sm ${
                      skill.type === "offer"
                        ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200"
                        : "bg-violet-100/80 text-violet-700 border border-violet-200"
                    }`}
                  >
                    {skill.type === "offer" ? "Offering" : "Requesting"}
                  </span>
                </div>

                {skill.category && (
                  <p className="text-xs text-slate-500 mb-3 bg-slate-100/80 px-3 py-1 rounded-full inline-block border border-slate-200/60">
                    {skill.category}
                  </p>
                )}

                <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                <div className="bg-slate-50/80 p-4 rounded-2xl mb-4 border border-slate-200/60 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="text-lg">📞</span> Contact Info:
                  </p>
                  <p className="text-sm font-medium text-slate-800 mb-1">
                    {skill.userContact.name}
                  </p>
                  <a
                    href={`mailto:${skill.userContact.email}`}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors block"
                  >
                    {skill.userContact.email}
                  </a>
                  {skill.userContact.phone && (
                    <p className="text-sm text-slate-600 mt-2">
                      📱 {skill.userContact.phone}
                    </p>
                  )}
                  {skill.userContact.whatsapp && (
                    <p className="text-sm text-slate-600 mt-1">
                      💬 WhatsApp: {skill.userContact.whatsapp}
                    </p>
                  )}
                  {skill.userContact.linkedin && (
                    <a
                      href={skill.userContact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors block mt-1"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {skill.userContact.instagram && (
                    <a
                      href={skill.userContact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors block mt-1"
                    >
                      📸 Instagram
                    </a>
                  )}
                  {skill.userContact.youtube && (
                    <a
                      href={skill.userContact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors block mt-1"
                    >
                      📺 YouTube
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => handleOpenComments(skill)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200/60 bg-white/80 text-sm font-medium text-slate-700 hover:bg-slate-50/80 transition-all duration-300 transform hover:scale-105 shadow-sm backdrop-blur-sm"
                  >
                    💬 Comment ({skill.commentCount || 0})
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleLike(skill.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-sm backdrop-blur-sm ${
                      isSkillLikedByCurrentUser(skill.likedBy, session?.user?.email)
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-200 animate-pulse"
                        : "bg-white/80 text-slate-700 border border-slate-200/60 hover:bg-rose-50/80"
                    }`}
                  >
                    ❤️ {skill.likes || 0}
                  </button>

                  {isUserOwner(skill.userContact?.email, session?.user?.email) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      disabled={actionLoading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-red-200"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400 border-t border-slate-200/60 pt-3">
                  Posted: {new Date(skill.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {commentModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 overflow-auto max-h-[90vh] border border-white/60 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-800">
                  Comment on "{commentModalSkill.skillName}"
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {commentModalSkill.commentCount || 0} comment(s)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCommentModalSkill(null)}
                className="text-slate-500 hover:text-slate-700 transition-colors p-2 rounded-full hover:bg-slate-100/80"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 space-y-3">
              {commentModalSkill.comments?.length > 0 ? (
                commentModalSkill.comments.map((comment, index) => (
                  <div key={`${comment.userEmail}-${index}`} className="rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm font-semibold text-slate-800">{comment.userName}</p>
                      <span className="text-xs text-slate-500 bg-white/60 px-2 py-1 rounded-full">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-300/60 bg-slate-50/60 p-6 text-center text-sm text-slate-500 backdrop-blur-sm">
                  💭 No comments yet. Be the first to share something helpful.
                </div>
              )}
            </div>

            {actionError && <p className="text-sm text-red-600 mb-3 bg-red-50/80 rounded-xl px-3 py-2 border border-red-200/60">{actionError}</p>}
            {successMessage && <p className="text-sm text-green-600 mb-3 bg-green-50/80 rounded-xl px-3 py-2 border border-green-200/60">{successMessage}</p>}

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Write your comment..."
                className="w-full rounded-2xl border border-slate-200/60 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 backdrop-blur-sm transition-all duration-300"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-sky-200"
                >
                  {actionLoading ? "✨ Posting..." : "💬 Post Comment"}
                </button>
                <button
                  type="button"
                  onClick={() => setCommentModalSkill(null)}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200/60 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50/80 transition-all duration-300 backdrop-blur-sm"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
