pl.view.listBooks = {
  setupUserInterface() {
    const tableBody = document.querySelector("table#books>tbody")
    Book.loadAll()
    const keys = Object.keys(Book.instances)
    let row = {}
    keys.forEach(key => {
      row = tableBody.insertRow()
      row.insertCell().textContent = Book.instances[key].isbn
      row.insertCell().textContent = Book.instances[key].title
      row.insertCell().textContent = Book.instances[key].year
    })
  },
}
