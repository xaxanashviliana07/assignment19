import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchItems = async (page) => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products?title=${page}`);
    const data = await response.json();
    setLoading(false);
    return data;
  };

  const loadMore = () => {
    const nextPage = page + 1;
    fetchItems(nextPage)
      .then(newItems => {
        setItems(prevItems => [...prevItems, ...newItems]);
        setPage(nextPage);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  useEffect(() => {
    fetchItems(page)
      .then(initialItems => {
        setItems(initialItems);
      })
      .catch(error => {
        console.error('Error fetching initial items:', error);
      });
  }, [page]);

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
