import React, { useState, useEffect } from 'react';
import './App.css';
import Loader from './modules/common/loader/Loader';

function App() {
  const [hide, setHide] = useState(false);

  function mock() {
    setTimeout(() => setHide(true), 3000);
  }

  useEffect(() => {
    mock();
  });

  return (
    <>
      <Loader hide={hide} />
      <div className="d-flex align-items-center justify-content-center h-100">
        <h1>You had to wait...</h1>
      </div>
    </>
  );
}

export default App;
