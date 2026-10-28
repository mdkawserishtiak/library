const library = [];

function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const addBookToLibrary = (title, author, pages, isRead) => {
  const id = crypto.randomUUID();

  const book = new Book(id, title, author, pages, isRead);

  library.push(book);
};
