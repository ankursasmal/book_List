import React, { useEffect, useState } from 'react';

function App() {
  const [bookName, setBookName] = useState('');
  const [bookList, setBookList] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const BooKapi = async () => {
    try {
      let res = await fetch('https://www.freetestapi.com/api/v1/books', {
        method: 'GET',
      });

      let data = await res.json();
      console.log(data);
      setBookList(data);
      setAllBooks(data);  
    } catch (e) {
      console.log('Data not fetched');
    }
  };

  useEffect(() => {
    BooKapi(); // Only fetch once
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBookName(searchTerm);

    const filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    setBookList(filteredBooks);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vw', flexDirection: 'column' }}>
      <h1 style={{ font: '30px', fontWeight: '500', color: 'blue' }}>Find Books</h1>
      <div style={{ marginTop: '2vw', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        
        {/* Search Input */}
        <input
          type="text"
          style={{ padding: '1vw .5vw', borderRadius: '2vw', marginBottom: '2vw', width: '100%', fontSize: '20px' }}
          placeholder='Search books'
          value={bookName}
          onChange={handleSearch}
        />

        {/* Book List */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2vw', overflow: 'hidden' }}>
          {bookList.map((val, i) => (
            <div key={i} style={{ width: '20vw', display: 'flex', alignItems: 'start', padding: '2px', flexDirection: 'column', border: '1.5px solid black', borderRadius: '2vw' }}>
              <img src={val.cover_image} style={{ width: '100%', objectFit: 'cover', borderTopLeftRadius: '2vw', borderTopRightRadius: '2vw' }} alt="" />
              <span style={{ fontSize: '1.5vw', marginTop: '1.5vw' }}>Title: {" " + val.title}</span>
              <span style={{ fontSize: '1.5vw', margin: '1.5vw 0px' }}>Author:{" " + val.author}</span>
              <span style={{ fontSize: '1.5vw', marginBottom: '1.5vw' }}>Publication Year: {" " + val.publication_year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
