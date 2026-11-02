# Library

A lightweight personal library tracker built with plain HTML, TailwindCSS, and JavaScript. It lets you keep track of books you've read, books you're currently reading, and books you want to add to your collection.

## Features

- Add new books with title, author, pages, and read status
- Mark books as read or unread
- Remove books from the library
- Persistent data storage using `localStorage`
- Responsive, simple UI for easy tracking

## Tech Stack

- HTML
- TailwindCSS
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

## How It Works

- The app stores all library entries in `localStorage`.
- Each book includes:
  - id
  - title
  - author
  - pages
  - read status
- The page dynamically renders the current list and handles add/remove actions in the browser.

## Example Usage

1. Click the "Add Book" button.
2. Enter the book's title, author, total pages, and whether it has been read.
3. Save it to your library.
4. Toggle the read status or remove any book whenever needed.
