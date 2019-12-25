/**
 * @fileOverview The model class Book with attribute definitions
 * and storage management methods
 *
 */

// import { randomInt, MAXIMUM_TEST_DATA } from "../utils"
// import sampleBooks from "../../sample-data/books.json"

/**
 * Constructor function for the class Book
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots
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

/*******************************************
 *** Auxiliary methods for testing **********
 ********************************************/

/**
 * Generate some example book records as test data
 */
Book.generateData = function(count = 10) {
  // const start = randomInt(0, MAXIMUM_TEST_DATA - count)
  // const books = sampleBooks.slice(start, count)
  const books = [
    { isbn: "349889587-7", title: "Derailed", year: 1996 },
    { isbn: "610729149-0", title: "Triumph of Love, The", year: 2000 },
    { isbn: "924653314-3", title: "Mexican Hayride", year: 2005 },
    { isbn: "504378996-4", title: "Time Machine, The", year: 1996 },
    { isbn: "999350634-6", title: "Chato's Land", year: 1997 },
    {
      isbn: "900094993-9",
      title: "Fearless Hyena, The (Xiao quan guai zhao)",
      year: 2002,
    },
    {
      isbn: "443965422-3",
      title: "Emergency Escape, The (Wyjscie awaryjne)",
      year: 2006,
    },
    { isbn: "186501202-5", title: "Take, The", year: 1994 },
    { isbn: "588711695-1", title: "Hero Wanted", year: 1993 },
    { isbn: "947002374-9", title: "Private Confessions", year: 1984 },
  ]
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
