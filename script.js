// Test Data
// To Kill a Mockingbird, Harper Lee, 281
// The Great Gatsby, F. Scott Fitzgerald, 180
// 1984, George Orwell, 328
// Pride and Prejudice, Jane Austen, 279
// The Catcher in the Rye, J.D. Salinger, 234
// The Hobbit, J.R.R. Tolkien, 310
// Brave New World, Aldous Huxley, 268
// Fahrenheit 451, Ray Bradbury, 249
// Crime and Punishment, Fyodor Dostoevsky, 671
// The Alchemist, Paulo Coelho, 208

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

const displayBooks = (books) => {
  const bookRows = books
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

  const addBookRow = `
        <tr>
            <td colspan="4" class="p-0!">
                <button
                class="w-full flex items-center justify-center p-0! bg-black border-2 text-white font-bold tracking-widest uppercase cursor-pointer hover:bg-white hover:text-black transition-all"
                popovertarget="add-book-dialog"
                >
                <img src="./icons/add-book.png" width="50" height="50" />
                Add Book
                </button>
            </td>
        </tr>
    `;

  document.querySelector("#table-body").innerHTML = bookRows + addBookRow;
};

const addBookButton = document.querySelector("#add-book-button");
const addBookDialog = document.querySelector("#add-book-dialog");

addBookButton.addEventListener("click", () => {
  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const inputPages = document.querySelector("#pages");
  const inputIsRead = document.querySelector("#read");

  if (
    inputTitle.value === "" ||
    inputAuthor.value === "" ||
    inputPages.value === ""
  ) {
    return;
  }

  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputIsRead.checked,
  );

  displayBooks(library);

  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputIsRead.checked = false;

  addBookDialog.hidePopover();
});
