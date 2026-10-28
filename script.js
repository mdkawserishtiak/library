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

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", true);
addBookToLibrary("1984", "George Orwell", "328", true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", "279", true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "234", false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", true);
addBookToLibrary("Brave New World", "Aldous Huxley", "268", false);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", "249", true);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", "671", false);
addBookToLibrary("The Alchemist", "Paulo Coelho", "208", true);

const displayBooks = (books) => {
  const tableHead = `<thead class="bg-black text-white uppercase tracking-wider">
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read</th>
        </tr>
      </thead>`;

  const tableBodyRows = books
    .map((book) => {
      return `
        <tr class="odd:bg-gray-200/70">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.isRead ? "Yes" : "No"}</td>
        </tr>
      `;
    })
    .join("");

  document.querySelector("#table").innerHTML =
    tableHead + "<tbody>" + tableBodyRows + "</tbody>";
};

displayBooks(library);
