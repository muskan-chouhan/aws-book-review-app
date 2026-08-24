require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Book Review API is running",
  });
});

// Get all books
app.get("/api/books", (req, res) => {
  const sql = "SELECT * FROM books ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch books",
      });
    }

    res.json(results);
  });
});

// Get single book with reviews
app.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  const bookSql = "SELECT * FROM books WHERE id = ?";

  db.query(bookSql, [bookId], (err, books) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch book",
      });
    }

    if (books.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const reviewSql =
      "SELECT * FROM reviews WHERE book_id = ? ORDER BY created_at DESC";

    db.query(reviewSql, [bookId], (err, reviews) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch reviews",
        });
      }

      res.json({
        book: books[0],
        reviews: reviews,
      });
    });
  });
});

// Add review
app.post("/api/reviews", (req, res) => {
  const { book_id, reviewer_name, rating, comment } = req.body;

  if (!book_id || !reviewer_name || !rating || !comment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be between 1 and 5",
    });
  }

  const sql = `
    INSERT INTO reviews
    (book_id, reviewer_name, rating, comment)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [book_id, reviewer_name, rating, comment],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to add review",
        });
      }

      res.status(201).json({
        message: "Review added successfully",
        reviewId: result.insertId,
      });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});