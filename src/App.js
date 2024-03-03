// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    try {
      const response = await fetch('/list_objects');
      if (response.ok) {
        const data = await response.json();
        setObjects(data);
      } else {
        throw new Error('Failed to fetch objects');
      }
    } catch (error) {
      console.error('Error fetching objects:', error);
    }
  };

  const deleteObject = async (objectName) => {
    try {
      const response = await fetch(`/delete_objects/${objectName}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchObjects(); // Atualiza a lista após a exclusão
      } else {
        throw new Error('Failed to delete object');
      }
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kubernetes Objects</h1>
      </header>
      <div className="Object-list">
        {objects.map((object, index) => (
          <div className="Object-card" key={index}>
            <h2>{object.metadata.name}</h2>
            <p>{object.spec.domain}</p>
            <button onClick={() => deleteObject(object.metadata.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
