const tableBody = document.querySelector("#table-body");
const cardContainer = document.querySelector("#card-container");

const addBookButton = document.querySelector("#add-book-button");
const selectView = document.querySelector("#view");

const library = (function () {
  const books = localStorage.getItem("library")
    ? JSON.parse(localStorage.getItem("library"))
    : [];

  class Book {
    constructor(title, author, category, pages, isRead) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.author = author;
      this.category = category;
      this.pages = pages;
      this.isRead = isRead;
    }
  }

  const getBook = (id) => {
    return books.find((book) => id === book.id);
  };

  const getAllBooks = () => {
    return books;
  };

  const getBooksByCategory = (category) => {
    return books.filter((book) => category === book.category);
  };

  const getBookIndex = (id) => {
    return books.findIndex((book) => id === book.id);
  };

  const uploadBooks = () => {
    localStorage.setItem("library", JSON.stringify(books));
  };

  const addBook = (title, author, category, pages, isRead) => {
    const book = new Book(title, author, category, pages, isRead);

    books.push(book);
    uploadBooks();
  };

  const removeBook = (id) => {
    books.splice(getBookIndex(id), 1);
    uploadBooks();
  };

  const toggleBookReadStatus = (id) => {
    const index = getBookIndex(id);

    books[index].isRead = !books[index].isRead;
    uploadBooks();
  };

  const updateBook = (id, title, author, category, pages, isRead) => {
    const index = getBookIndex(id);

    books[index].title = title;
    books[index].author = author;
    books[index].category = category;
    books[index].pages = pages;
    books[index].isRead = isRead;

    uploadBooks();
  };

  return {
    getBook,
    getAllBooks,
    getBooksByCategory,
    addBook,
    removeBook,
    toggleBookReadStatus,
    updateBook,
  };
})();

const interface = (function () {
  const bookDialog = document.querySelector("#book-dialog");

  const editBookButtonSpecial = document.querySelector("#edit-book-button");

  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const selectCategory = document.querySelector("#category");
  const inputPages = document.querySelector("#pages");
  const inputIsRead = document.querySelector("#read");

  const renderBooks = () => {
    const books =
      selectView.value === "All"
        ? library.getAllBooks()
        : library.getBooksByCategory(selectView.value);

    let cards = "";
    let rows = "";

    books.forEach((book) => {
      cards += `<div class="mt-10 p-5 border border-gray-100 rounded shadow-xl">
        <h2 class="flex justify-between border-b-2 border-gray-300 pb-3">
          <span class="font-black uppercase">Title</span>
          <span>${book.title}</span>
        </h2>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Author</span>
          <span>${book.author}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Category</span>
          <span>${book.category ? book.category : "Uncategorized"}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Pages</span>
          <span>${book.pages}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Read</span>
          <span class="flex items-center gap-2">
            ${book.isRead ? "Yes" : "No"}
            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black toggle-read-status"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/exchange.png"
                width="27"
                height="27"
              /></button
          ></span>
        </div>

        <div class="flex justify-between pt-3">
          <span class="font-black uppercase">Actions</span>
          <span class="flex gap-2">
            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black edit-book"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/edit-book.png"
                width="40"
                height="40"
              />
            </button>

            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black remove-book"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/remove-book.png"
                width="40"
                height="40"
              />
            </button>
          </span>
        </div>
      </div>`;

      rows += `<tr class="odd:bg-gray-200/70">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.category ? book.category : "Uncategorized"}</td>
          <td>${book.pages}</td>
          <td>
            <div class="p-0!">${book.isRead ? "Yes" : "No"}</div>

            <button
                class="p-0! cursor-pointer transition-all hover:border-b-3 toggle-read-status"
                data-id="${book.id}"
                >
                <img class="p-1!" src="./icons/exchange.png" width="26" height="26" />
            </button>
          </td>
          <td class="flex justify-center gap-3">
          <button
              class="p-0! cursor-pointer transition-all hover:border-b-3 edit-book"
              data-id="${book.id}"
            >
              <img
                class="p-1!"
                src="./icons/edit-book.png"
                width="40"
                height="40"
              />
            </button>

            <button
                class="p-0! cursor-pointer transition-all hover:border-b-3 remove-book"
                data-id="${book.id}"
                >
                <img class="p-1!" src="./icons/remove-book.png" width="40" height="40" />
              </button>
          </td>
        </tr>`;
    });

    tableBody.innerHTML = rows;
    cardContainer.innerHTML = cards;

    selectCategory.value =
      selectView.value === "All" ? "Uncategorized" : selectView.value;
  };

  const resetInputs = () => {
    inputTitle.value = "";
    inputAuthor.value = "";
    selectCategory.value =
      selectView.value === "All" ? "Uncategorized" : selectView.value;
    inputPages.value = "";
    inputIsRead.checked = false;
  };

  const toggleButton = (button) => {
    if (button.classList.contains("flex")) {
      button.classList.remove("flex");
      button.classList.add("hidden");
    } else {
      button.classList.add("flex");
      button.classList.remove("hidden");
    }
  };

  const swapButton = () => {
    // MAIN
    // addBookButton.classList.remove("hidden");
    // addBookButton.classList.add("flex");
    // editBookButtonSpecial.classList.remove("flex");
    // editBookButtonSpecial.classList.add("hidden");
    // END
    // resetButton(addBookButton);
    // resetButton(editBookButtonSpecial);

    toggleButton(addBookButton);
    toggleButton(editBookButtonSpecial);
  };

  const resetForm = () => {
    resetInputs();

    editBookButtonSpecial.classList.remove("flex");
    editBookButtonSpecial.classList.add("hidden");

    addBookButton.classList.add("flex");
    addBookButton.classList.remove("hidden");
  };

  const handleAddBook = (event) => {
    event.preventDefault();

    if (
      inputTitle.value === "" ||
      inputAuthor.value === "" ||
      inputPages.value === ""
    ) {
      return;
    }

    library.addBook(
      inputTitle.value,
      inputAuthor.value,
      selectCategory.value,
      inputPages.value,
      inputIsRead.checked,
    );

    bookDialog.hidePopover();

    renderBooks();
    resetInputs();
  };

  const handleActions = (event) => {
    const toggleReadStatusButton = event.target.closest(".toggle-read-status");
    const removeBookButton = event.target.closest(".remove-book");
    const editBookButton = event.target.closest(".edit-book");

    if (!(toggleReadStatusButton || removeBookButton || editBookButton)) return;

    const id = toggleReadStatusButton
      ? toggleReadStatusButton.dataset.id
      : removeBookButton
        ? removeBookButton.dataset.id
        : editBookButton.dataset.id;

    if (toggleReadStatusButton) {
      library.toggleBookReadStatus(id);
      renderBooks();
    } else if (removeBookButton) {
      library.removeBook(id);
      renderBooks();
    } else {
      swapButton();
      bookDialog.showPopover();

      const book = library.getBook(id);

      inputTitle.value = book.title;
      inputAuthor.value = book.author;
      selectCategory.value = book.category;
      inputPages.value = book.pages;
      inputIsRead.checked = book.isRead;

      editBookButtonSpecial.onclick = (event) => {
        event.preventDefault();

        if (
          inputTitle.value === "" ||
          inputAuthor.value === "" ||
          inputPages.value === ""
        ) {
          return;
        }

        library.updateBook(
          id,
          inputTitle.value,
          inputAuthor.value,
          selectCategory.value,
          inputPages.value,
          inputIsRead.checked,
        );

        bookDialog.hidePopover();
        renderBooks();
        resetForm();
      };
    }
  };

  return { renderBooks, handleAddBook, resetForm, handleActions };
})();

interface.renderBooks();

addBookButton.addEventListener("click", interface.handleAddBook);
document.querySelector("#close").addEventListener("click", interface.resetForm);

tableBody.addEventListener("click", interface.handleActions);
cardContainer.addEventListener("click", interface.handleActions);

selectView.addEventListener("change", interface.renderBooks);
