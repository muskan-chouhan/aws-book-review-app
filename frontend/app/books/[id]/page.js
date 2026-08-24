"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookDetails() {
  const params = useParams();
  const id = params.id;

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }

        return response.json();
      })
      .then((data) => {
        setBook(data.book);
        setReviews(data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load book details.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setFormError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: Number(id),
          reviewer_name: reviewerName,
          rating: Number(rating),
          comment: comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add review");
      }

      setSuccess("Review added successfully! 🎉");

      setReviewerName("");
      setRating(5);
      setComment("");

      // Reload book + reviews
      const updatedResponse = await fetch(`${API_URL}/api/books/${id}`);
      const updatedData = await updatedResponse.json();

      setReviews(updatedData.reviews);

      setShowForm(false);
    } catch (error) {
      console.error(error);
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading book...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-red-500">{error}</p>

          <a
            href="/"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-5 py-2 text-white"
          >
            Back to Books
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            📚 BookShelf
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Back to Books
          </a>
        </div>
      </nav>

      {/* Book Details */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-[280px_1fr]">

          {/* Cover */}
          <div className="flex h-[400px] items-center justify-center overflow-hidden rounded-xl bg-slate-200">
            {book.cover_image ? (
              <img
                src={book.cover_image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-7xl">📖</span>
            )}
          </div>

          {/* Book information */}
          <div className="flex flex-col justify-center">

            <p className="font-semibold uppercase tracking-wide text-blue-600">
              Book Details
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              {book.title}
            </h1>

            <p className="mt-3 text-lg font-medium text-slate-500">
              by {book.author}
            </p>

            <div className="mt-5 text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-6 max-w-2xl leading-8 text-slate-600">
              {book.description}
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-8 w-fit rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              ✍️ Write a Review
            </button>

          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        id="reviews"
        className="mx-auto max-w-6xl px-6 pb-16"
      >

        <div className="mb-8">
          <p className="font-semibold text-blue-600">
            READER FEEDBACK
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Reviews
          </h2>
        </div>

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-700">
              No reviews yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Be the first person to review this book.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-slate-900">
                    {review.reviewer_name}
                  </h3>

                  <span className="text-sm text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>

                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  {review.comment}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>

              </div>
            ))}
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Write a Review
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Share your experience with this book.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-xl text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Name
                </label>

                <input
                  type="text"
                  value={reviewerName}
                  onChange={(event) =>
                    setReviewerName(event.target.value)
                  }
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Rating */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Rating
                </label>

                <select
                  value={rating}
                  onChange={(event) =>
                    setRating(event.target.value)
                  }
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ — Excellent</option>
                  <option value="4">⭐⭐⭐⭐ — Very Good</option>
                  <option value="3">⭐⭐⭐ — Good</option>
                  <option value="2">⭐⭐ — Average</option>
                  <option value="1">⭐ — Poor</option>
                </select>
              </div>

              {/* Comment */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Review
                </label>

                <textarea
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  placeholder="Write your review..."
                  rows="5"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {formError && (
                <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>

            </form>
          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-6 text-center text-sm text-slate-400">
        © 2026 BookShelf. All rights reserved.
      </footer>

    </main>
  );
}