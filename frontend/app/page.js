"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span className="text-2xl font-bold tracking-tight">
              BookShelf
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="font-medium text-blue-600">
              Home
            </Link>

            <Link
              href="#books"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Books
            </Link>

            <Link
              href="#categories"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Categories
            </Link>

            <Link
              href="#reviews"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Reviews
            </Link>

            <Link
              href="#about"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="#contact"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          <Link
            href="#books"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Explore
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">

          <div>
            <p className="mb-5 font-semibold uppercase tracking-widest text-blue-400">
              Your Reading Community
            </p>

            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
              Discover your
              <br />
              next great read.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Explore inspiring books, discover new authors and share
              honest reviews with fellow readers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#books"
                className="rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white hover:bg-blue-700"
              >
                Browse Books →
              </Link>

              <Link
                href="#about"
                className="rounded-lg border border-slate-600 px-7 py-3.5 font-semibold text-white hover:bg-slate-800"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-5">

              <div className="flex h-52 w-36 rotate-[-6deg] items-center justify-center rounded-lg bg-blue-600 p-5 text-center text-xl font-bold text-white shadow-2xl">
                The
                <br />
                Alchemist
              </div>

              <div className="mt-8 flex h-52 w-36 rotate-[5deg] items-center justify-center rounded-lg bg-amber-400 p-5 text-center text-xl font-bold text-slate-900 shadow-2xl">
                Atomic
                <br />
                Habits
              </div>

              <div className="col-span-2 mx-auto flex h-52 w-36 rotate-[-2deg] items-center justify-center rounded-lg bg-slate-700 p-5 text-center text-xl font-bold text-white shadow-2xl">
                Psychology
                <br />
                of Money
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x md:grid-cols-4">

          <div className="p-8 text-center">
            <p className="text-3xl font-bold">100+</p>
            <p className="mt-1 text-sm text-slate-500">Books</p>
          </div>

          <div className="p-8 text-center">
            <p className="text-3xl font-bold">500+</p>
            <p className="mt-1 text-sm text-slate-500">Reviews</p>
          </div>

          <div className="p-8 text-center">
            <p className="text-3xl font-bold">50+</p>
            <p className="mt-1 text-sm text-slate-500">Authors</p>
          </div>

          <div className="p-8 text-center">
            <p className="text-3xl font-bold">4.8★</p>
            <p className="mt-1 text-sm text-slate-500">Average Rating</p>
          </div>

        </div>
      </section>

      {/* ================= BOOKS ================= */}
      <section id="books" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="font-semibold uppercase tracking-widest text-blue-600">
                Explore Collection
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                Featured Books
              </h2>

              <p className="mt-3 text-slate-500">
                Discover books readers are talking about.
              </p>
            </div>

            <Link
              href="#books"
              className="hidden font-semibold text-blue-600 md:block"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-500">
              Loading books...
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {books.map((book) => (
                <article
                  key={book.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="h-72 overflow-hidden bg-slate-200">
                    {book.cover_image ? (
                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-7xl">
                        📖
                      </div>
                    )}
                  </div>

                  <div className="p-6">

                    <div className="mb-3 text-sm text-yellow-500">
                      ⭐⭐⭐⭐⭐
                    </div>

                    <h3 className="text-xl font-bold">
                      {book.title}
                    </h3>

                    <p className="mt-1 font-medium text-blue-600">
                      {book.author}
                    </p>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                      {book.description}
                    </p>

                    <Link
                      href={`/books/${book.id}`}
                      className="mt-6 block rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      Read Reviews
                    </Link>

                  </div>
                </article>
              ))}

            </div>
          )}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Find Your Interest
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Explore by Category
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["📖", "Fiction", "Stories that take you somewhere new."],
              ["🚀", "Self Improvement", "Books to help you grow."],
              ["💰", "Finance", "Learn about money and investing."],
              ["🧠", "Psychology", "Understand people and behaviour."],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 p-7 transition hover:border-blue-300 hover:shadow-lg"
              >
                <div className="text-4xl">{icon}</div>

                <h3 className="mt-5 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= WHY BOOKSHELF ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 md:grid-cols-2">

            <div>
              <p className="font-semibold uppercase tracking-widest text-blue-600">
                Why BookShelf?
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight">
                More than just
                <br />
                a book collection.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                BookShelf helps readers discover books through real
                experiences and honest opinions from other readers.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl">🔎</div>
                <h3 className="mt-4 font-bold">Discover</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Find books worth adding to your reading list.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl">⭐</div>
                <h3 className="mt-4 font-bold">Review</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Share your honest thoughts and ratings.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl">💬</div>
                <h3 className="mt-4 font-bold">Connect</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Learn from the experiences of other readers.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl">📚</div>
                <h3 className="mt-4 font-bold">Build Your List</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Keep discovering your next great read.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Reader Community
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              What Readers Say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              [
                "The Alchemist completely changed the way I look at dreams and goals.",
                "Priya Sharma",
              ],
              [
                "Atomic Habits is practical, simple and extremely useful.",
                "Rahul Mehta",
              ],
              [
                "A great platform for finding books before buying them.",
                "Ananya Singh",
              ],
            ].map(([review, name]) => (
              <div
                key={name}
                className="rounded-2xl bg-slate-50 p-7"
              >
                <div className="text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="mt-5 leading-7 text-slate-600">
                  “{review}”
                </p>

                <p className="mt-5 font-semibold">
                  — {name}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="bg-slate-950 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-400">
            About BookShelf
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            A place for people who love books.
          </h2>

          <p className="mt-6 leading-8 text-slate-300">
            BookShelf is a book discovery and review platform created
            for readers who want to explore new books and learn from
            genuine reader experiences. Discover a book, read its
            reviews and share your own perspective with the community.
          </p>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Found a book you love?
          </h2>

          <p className="mt-4 text-blue-100">
            Share your experience and help another reader discover it.
          </p>

          <Link
            href="#books"
            className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 hover:bg-slate-100"
          >
            Explore Books
          </Link>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-slate-950 text-slate-400">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              📚 BookShelf
            </div>

            <p className="mt-4 text-sm leading-6">
              Discover books. Share thoughts. Find your next great read.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <Link href="/" className="block hover:text-white">
                Home
              </Link>

              <Link href="#books" className="block hover:text-white">
                Books
              </Link>

              <Link href="#reviews" className="block hover:text-white">
                Reviews
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Categories
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <p>Fiction</p>
              <p>Self Improvement</p>
              <p>Finance</p>
              <p>Psychology</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <p>📧 hello@bookshelf.com</p>
              <p>📍 India</p>
              <p>📚 Made for readers</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 py-6 text-center text-sm">
          © 2026 BookShelf. All rights reserved.
        </div>

      </footer>

    </main>
  );
}