import React from 'react';
import VideoCatalog from './components/VideoCatalog';
import UploadPanel from './components/UploadPanel';

function App() {
  return (
    <div className="App">
      <h1>Video Management App</h1>
      <UploadPanel />
      <VideoCatalog/>
    </div>
  );
}

export default App;
