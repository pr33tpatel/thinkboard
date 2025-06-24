import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, NotebookPenIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios_api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dismiss any previous toasts
    toast.dismiss();

    if (!title.trim()) {
      toast.error("Please enter a title.");
      titleRef.current?.focus();
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content.");
      contentRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      await axios_api.post("/notes", {
        title,
        content,
      });
      setTimeout(() => navigate("/"), 550); // Navigate after a short delay
      toast.success("Note Created");
    } catch (error) {
      console.log("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme="synthwave" className="min-h-screen bg-gray-950">
      {/* Floating Back Button */}
      <Link to="/" className="fixed top-6 left-6 btn btn-circle btn-ghost shadow-md z-10" title="Back to Notes">
        <ArrowLeftIcon className="size-5" />
      </Link>

      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-primary/20 rounded-full p-5 mb-3 shadow-lg">
            <NotebookPenIcon className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-1">Create a New Note</h1>
          <p className="text-base-content text-lg opacity-80">Jot down your thoughts, ideas, or reminders. All in one place.</p>
        </div>

        {/* Card Form */}
        <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <SparklesIcon className="size-4 text-primary" />
                    Title
                  </span>
                </label>
                <input ref={titleRef} type="text" placeholder="e.g. Grocery List" className="input input-bordered input-lg" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} disabled={loading} autoFocus />
              </div>

              {/* Content Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <NotebookPenIcon className="size-4 text-primary" />
                    Content
                  </span>
                </label>
                <textarea ref={contentRef} placeholder="Write your note here..." className="textarea textarea-bordered textarea-lg min-h-[120px]" value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} disabled={loading} />
              </div>

              {/* Submit Button */}
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary btn-lg flex items-center gap-2" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2Icon className="animate-spin size-5" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="size-5" />
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
