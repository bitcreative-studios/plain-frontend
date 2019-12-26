pl.view.deleteBook = {
  setupUserInterface() {
    const form = document.forms["Book"]
    const { bookSelection, commit: deleteButton } = form
    let option
    let book

    Book.loadAll()
    const keys = Object.keys(Book.instances)
    keys.forEach(isbn => {
      book = Book.instances[isbn]
      option = document.createElement("option")
      option.text = book.title
      option.value = book.isbn
      bookSelection.add(option)
    })
    deleteButton.addEventListener(
      "click",
      pl.view.deleteBook.handleDeleteButtonClickEvent
    )
  },
  handleDeleteButtonClickEvent() {
    const { bookSelection } = document.forms["Book"]
    const { value: isbn } = bookSelection
    if (isbn) {
      Book.destroy(isbn)
      // remove deleted book from select options
      bookSelection.remove(bookSelection.selectedIndex)
    }
  },
}
