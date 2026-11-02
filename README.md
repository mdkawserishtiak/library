# Library

A lightweight personal library tracker built with plain HTML, CSS, and JavaScript. It lets you keep track of books you've read, books you're currently reading, and books you want to add to your collection.

## Features

- Add new books with title, author, pages, and read status
- Mark books as read or unread
- Remove books from the library
- Persistent data storage using `localStorage`
- Responsive, simple UI for easy tracking

## Tech Stack

- HTML
- CSS
- JavaScript

## Project Structure

```text
library/
├── index.html
├── script.js
├── styles.css
├── .gitignore
├── README.md
└── icons/
```

## How to Run

Because this is a static web app, you can run it in either of these ways:

1. Open `index.html` directly in your browser, or
2. Serve it locally with a simple static server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## How It Works

- The app stores all library entries in `localStorage`.
- Each book includes:
  - id
  - title
  - author
  - pages
  - read status
- The page dynamically renders the current list and handles add/remove/update actions in the browser.

## Example Usage

1. Click the "Add Book" button.
2. Enter the book's title, author, total pages, and whether it has been read.
3. Save it to your library.
4. Toggle the read status or remove any title whenever needed.

## License

This project is open for personal use and modification.

## Author

Built as a small library management app for organizing personal reading lists.