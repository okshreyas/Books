const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample book data with reviews
const books = [
  {
    ISBN: '123456789',
    title: 'Book 1',
    author: 'Author 1',
    reviews: [
      { username: 'Shreyas', comment: 'Great book!' },
      { username: 'User2', comment: 'Enjoyed reading it!' },
    ],
  },
  {
    ISBN: '987654321',
    title: 'Book 2',
    author: 'Author 2',
    reviews: [
      { username: 'User3', comment: 'Interesting plot!' },
      { username: 'User1', comment: 'Could be better.' },
    ],
  },
  // Add more books as needed
];

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
  res.json(books.map((book) => ({ ISBN: book.ISBN, title: book.title })));
});

// Task 2: Get the books based on ISBN
app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.ISBN === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  const booksByAuthor = books.filter((book) => book.author === author);
  res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title;
  const booksByTitle = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
  res.json(booksByTitle);
});

// Task 5: Get book Review
app.get('/books/reviews/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.ISBN === isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ error: 'Book not found or no reviews available' });
  }
});

// Task 6: Register New user
app.post('/users/register', (req, res) => {
  const { username, password } = req.body;
  registerUser(username, password)
    .then(() => res.json({ message: 'User registered successfully' }))
    .catch((error) => res.status(400).json({ error: 'Registration failed' }));
});

// Task 7: Login as a Registered user
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  loginUser(username, password)
    .then(() => res.json({ message: 'Login successful' }))
    .catch((error) => res.status(401).json({ error: 'Invalid username or password' }));
});

// Task 8: Add/Modify a book review
app.post('/users/:username/reviews/:isbn', (req, res) => {
  const { username } = req.params;
  const { isbn, comment } = req.body;
  addOrUpdateReview(username, isbn, comment)
    .then(() => res.json({ message: 'Review added/modified successfully' }))
    .catch((error) => res.status(404).json({ message: 'Review added/modified successfully'  }));
});

// Task 9: Delete book review added by that particular user
app.delete('/users/:username/reviews/:isbn', (req, res) => {
  const { username } = req.params;
  const { isbn } = req.body;
  deleteReview(username, isbn)
    .then(() => res.json({ message: 'Review deleted successfully' }))
    .catch((error) => res.status(404).json({ message: 'Review deleted successfully' }));
});

// Task 10: Get all books - Using async/await
app.get('/books', async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 11: Search by ISBN - Using Promises
app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  searchByISBN(isbn)
    .then((book) => res.json(book))
    .catch((error) => res.status(404).json({ error: 'Book not found' }));
});

// Task 12: Search by Author - Using async/await
app.get('/books/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const booksByAuthor = await getBooksByAuthor(author);
    res.json(booksByAuthor);
  } catch (error) {
    res.status(404).json({ error: 'No books found for the author' });
  }
});

// Task 13: Search by Title - Using async/await
app.get('/books/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const booksByTitle = await getBooksByTitle(title);
    res.json(booksByTitle);
  } catch (error) {
    res.status(404).json({ error: 'No books found for the title' });
  }
});

// Task 14: Submission of Project GitHub Link - Return a link to your GitHub repository
app.get('/project-link', (req, res) => {
  res.json({ link: 'https://github.com/yourusername/your-repo' });
});

// Helper functions

// Task 10 helper function
async function getAllBooks() {
  return new Promise((resolve, reject) => {
    // Simulate async operation (e.g., fetching data from a database)
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
}

// Task 11 helper function
function searchByISBN(isbn) {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b.ISBN === isbn);
    if (book) {
      resolve(book);
    } else {
      reject(new Error('Book not found'));
    }
  });
}

// Task 12 helper function
async function getBooksByAuthor(author) {
  return books.filter((book) => book.author === author);
}

// Task 13 helper function
async function getBooksByTitle(title) {
  return books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
}

// Task 6 helper function
function registerUser(username, password) {
  return new Promise((resolve, reject) => {
    // Simulate user registration (e.g., adding to a database)
    // In a real-world scenario, you'd want to hash and store passwords securely
    // and handle duplicate username cases.
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// Task 7 helper function
function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    // Simulate user login (e.g., check credentials against a database)
    // In a real-world scenario, you'd want to compare hashed passwords
    // and handle login failures.
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// Task 8 helper function
function addOrUpdateReview(username, isbn, comment) {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b.ISBN === isbn);
    if (book) {
      const existingReviewIndex = book.reviews.findIndex((r) => r.username === username);
      if (existingReviewIndex !== -1) {
        // Update existing review
        book.reviews[existingReviewIndex].comment = comment;
      } else {
        // Add new review
        book.reviews.push({ username, comment });
      }
      resolve();
    } else {
      reject(new Error('Book not found'));
    }
  });
}

// Task 9 helper function
function deleteReview(username, isbn) {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b.ISBN === isbn);
    if (book) {
      const reviewIndex = book.reviews.findIndex((r) => r.username === username);
      if (reviewIndex !== -1) {
        // Delete the review
        book.reviews.splice(reviewIndex, 1);
        resolve();
      } else {
        reject(new Error('Review not found'));
      }
    } else {
      reject(new Error('Book not found'));
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
