import React, { useState } from 'react';
import BookItem from './BookItem';

 
const initialBooks = [
  { id: 1, title: "Harry Potter", pages: 350, read: false },
  { id: 2, title: "Władca Pierścieni", pages: 500, read: true },
  { id: 3, title: "Wiedźmin", pages: 300, read: false },
  { id: 4, title: "1984", pages: 250, read: true },
  { id: 5, title: "Hobbit", pages: 400, read: false }
];
 
const BookManager = () => {
  const [books, setBooks] = useState(initialBooks);
  const [filter, setFilter] = useState('all'); 
  const [sortBy, setSortBy] = useState('none'); 
 
 
  const toggleRead = (id) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  };
 
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };
 
  const updatePages = (id, newPages) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, pages: newPages } : book
      )
    );
  };
 
  const markAllAsRead = () => {
    setBooks(prevBooks => prevBooks.map(book => ({ ...book, read: true })));
  };
 

 
  const getFilteredAndSortedBooks = () => {
    let result = [...books]; 
 

    if (filter === 'read') {
      result = result.filter(book => book.read);
    } else if (filter === 'unread') {
      result = result.filter(book => !book.read);
    }
 

    if (sortBy === 'pages_asc') {
     
      result.sort((a, b) => a.pages - b.pages);
    } else if (sortBy === 'pages_desc') {
   
      result.sort((a, b) => b.pages - a.pages);
    }
 
    return result;
  };
 
  const filteredAndSortedBooks = getFilteredAndSortedBooks();
 

  const totalBooks = books.length;

  const readBooksCount = books.filter(book => book.read).length;

  const totalPagesSum = books.reduce((sum, book) => sum + book.pages, 0);
 
  return (
    <div className="book-manager-container">
      <h1>📚 Menedżer Biblioteki</h1>
 
   
      <div className="stats-container">
        <h2>Statystyki</h2>
        <p>Książki przeczytane: <strong>{readBooksCount} / {totalBooks}</strong></p>
        <p>Suma stron: <strong>{totalPagesSum}</strong></p>
        <button onClick={markAllAsRead}>
          Przeczytaj wszystko
        </button>
      </div>
 
    
      <div className="controls-container">
        <div>
          <strong>Filtruj: </strong>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Wszystkie</option>
            <option value="read">Przeczytane</option>
            <option value="unread">Nieprzeczytane</option>
          </select>
        </div>
        <div>
          <strong>Sortuj po stronach: </strong>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Bez sortowania</option>
            <option value="pages_asc">Rosnąco (strony)</option>
            <option value="pages_desc">Malejąco (strony)</option>
          </select>
        </div>
      </div>
 
   
      <div>
        <h2>Moje Książki</h2>
        {filteredAndSortedBooks.length === 0 ? (
          <p>Brak książek do wyświetlenia zgodnie z filtrem/sortowaniem.</p>
        ) : (
          filteredAndSortedBooks.map(book => (
            <BookItem
              key={book.id}
              book={book}
              onToggleRead={toggleRead}
              onDelete={deleteBook}
              onUpdatePages={updatePages}
            />
          ))
        )}
      </div>
    </div>
  );
};
 
export default BookManager;
