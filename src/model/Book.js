import { randomInt, MAXIMUM_TEST_DATA } from "../utils"
import sampleBooks from "../../sample-data/books"

/**
 *
 * @param slots
 * @constructor
 */
function Book(slots) {
  this.isbn = slots.isbn
  this.title = slots.title
  this.year = slots.year
}

/**
 * The collection of all Book instances managed by the application
 * in the form of a JSON 'table' (i.e., a map of records).
 * Where an ISBN is a key for accessing the corresponding book record
 */
Book.instances = {}

/**
 * Convert a JS object representing a book record into
 * an instance of the Book class
 */
Book.convertRow2Obj = function(bookRow) {
  return new Book(bookRow)
}

/**
 * Load all managed Book instances from the persistent data store
 */
Book.loadAll = function() {
  let keys = []
  let booksString = ""
  let books = {}
  try {
    if (localStorage.books) {
      booksString = localStorage.books
    }
  } catch (e) {
    alert(`Error when reading from Local Storage\n ${e}`)
  }
  if (booksString) {
    books = JSON.parse(booksString)
    keys = Object.keys(books)
    keys.forEach(key => {
      Book.instances[key] = Book.convertRow2Obj(books[key])
    })
  }
  console.log(`${keys.length} books loaded.`)
}

/**
 * Save all managed Book instances to the persistent data store
 */
Book.saveAll = function() {
  let booksString = ""
  let error = false
  const NUMBER_OF_BOOKS = Object.keys(Book.instances).length
  try {
    booksString = JSON.stringify(Book.instances)
    localStorage.books = booksString
  } catch (e) {
    alert(`Error while writing to Local Storage\n ${e}`)
    error = true
  }
  if (!error) console.log(`${NUMBER_OF_BOOKS} books saved`)
}

/**
 * Crate a new Book instance
 */
Book.add = function(slots) {
  Book.instances[slots.isbn] = new Book(slots)
  console.log(`Book ${slots.isbn} created!`)
}

/**
 * Update an existing Book instance
 */
Book.update = function(slots) {
  const book = Book.instances[slots.isbn]
  const year = parseInt(slots.year, 10)
  if (book.title !== slots.title) {
    book.title = slots.title
  }
  if (book.year !== year) {
    book.year = year
  }
  cosole.log(`Book ${slots.isbn} updated!`)
}

/**
 * Delete a Book instance
 */
Book.destroy = function(isbn) {
  if (Book.instances[isbn]) {
    console.log(`Book ${isbn} deleted!`)
    delete Book.instances[isbn]
  } else {
    console.log(`There is no book with ISBN ${isbn} in the database`)
  }
}

/**
 * Generate some example book records as test data
 */
Book.generateData = function(count = 10) {
  const books = sampleBooks.slice(0, count)
  books.forEach(book => {
    Book.instances[book.isbn] = new Book(book)
  })
  Book.saveAll()
}

/**
 * Clear the book datastore
 */
Book.clearData = function() {
  if (confirm("Do you really want to delete all your book data?")) {
    localStorage.books = "{}"
  }
}
