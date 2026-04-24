"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";
import { FaRegPaperPlane } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { Box, Modal, Typography } from "@mui/material";

const validationSchema = Yup.object().shape({
  type: Yup.string().oneOf(["offer", "wanted"]).required("Required"),
  skillName: Yup.string()
    .min(3, "Skill name must be at least 3 characters")
    .required("Skill name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  category: Yup.string().required("Please select a category"),
  youtube: Yup.string().url("Please enter a valid URL (e.g., https://youtube.com/...)"),
  whatsapp: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g., +1234567890)"),
  linkedin: Yup.string().url("Please enter a valid LinkedIn URL"),
  instagram: Yup.string().url("Please enter a valid Instagram URL"),
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  textAlign: "center",
  outline: "none",
};

export default function PostSkill() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToast } = useToast();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        addToast("Skill posted successfully!", "success");
        setShowSuccessModal(true);
        resetForm();
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        const data = await res.json();
        addToast(data.error || "Error posting skill", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      addToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-sky-100 px-4 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-slate-700 text-lg mb-5">
            You need to sign in to post a skill.
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 rounded-[2rem] border border-white/80 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
          <Link
            href="/dashboard"
            className="text-slate-600 hover:text-slate-900 mb-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
            Post a Skill
          </h1>
          <p className="text-slate-600 text-lg leading-8 max-w-2xl">
            Share what you can offer or ask for support in a warm, human-centered marketplace.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">

        <Formik
          initialValues={{
            type: "offer",
            skillName: "",
            description: "",
            category: "",
            youtube: "",
            whatsapp: "",
            linkedin: "",
            instagram: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What type of skill?
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-sky-300 hover:bg-slate-100 cursor-pointer">
                    <Field
                      type="radio"
                      name="type"
                      value="offer"
                      className="h-4 w-4 text-sky-600"
                    />
                    <span>I can teach this</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-sky-300 hover:bg-slate-100 cursor-pointer">
                    <Field
                      type="radio"
                      name="type"
                      value="wanted"
                      className="h-4 w-4 text-sky-600"
                    />
                    <span>I want to learn this</span>
                  </label>
                </div>
                <ErrorMessage name="type" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="skillName">
                  Skill Name *
                </label>
                <Field
                  id="skillName"
                  name="skillName"
                  placeholder="e.g., Web Design, Python Programming, Digital Marketing"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                />
                <ErrorMessage name="skillName" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  Description *
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Tell more about this skill, your experience level, what you can teach or want to learn..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                  rows="4"
                />
                <ErrorMessage name="description" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                  Category *
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">-- Select Category --</option>
                  <option value="Technology">Technology & Programming</option>
                  <option value="Business">Business & Entrepreneurship</option>
                  <option value="Design">Design & Creative</option>
                  <option value="Language">Language & Communication</option>
                  <option value="Personal Development">Personal Development</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="youtube">
                  YouTube Link (optional)
                </label>
                <Field
                  id="youtube"
                  name="youtube"
                  type="url"
                  placeholder="e.g., https://youtube.com/@yourchannel"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                />
                <ErrorMessage name="youtube" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="whatsapp">
                  WhatsApp (optional)
                </label>
                <Field
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="e.g., +1234567890"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                />
                <ErrorMessage name="whatsapp" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="linkedin">
                  LinkedIn (optional)
                </label>
                <Field
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="e.g., https://linkedin.com/in/yourprofile"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                />
                <ErrorMessage name="linkedin" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="instagram">
                  Instagram (optional)
                </label>
                <Field
                  id="instagram"
                  name="instagram"
                  type="url"
                  placeholder="e.g., https://instagram.com/yourusername"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-sky-300"
                />
                <ErrorMessage name="instagram" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-3xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-3 text-white font-semibold shadow-lg transition hover:from-sky-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <FiLoader className="animate-spin" /> : <FaRegPaperPlane />}
                  {isSubmitting ? "Posting..." : "Post Skill"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-700 font-semibold shadow-sm transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
          <Box sx={modalStyle}>
            <CiCircleCheck className="text-green-500 text-6xl mx-auto mb-4" />
            <Typography variant="h5" component="h2" className="font-bold mb-2">
              Success!
            </Typography>
            <Typography className="text-slate-700">
              Your skill has been posted successfully. Redirecting to dashboard...
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  </div>
  );
}
