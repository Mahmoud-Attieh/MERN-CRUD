import React, {  useState,useEffect } from 'react';
import List from './components/List';
import Details from './components/Details';
import Update from './components/Update';
import Form from './components/Form';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
            <Routes>
            <Route path="/" element={< List />} />
            <Route path="/notes/new" element={<Form />} />
            <Route path="/notes/:id" element={<Details />} />
            <Route path="/notes/edit/:id" element={<Update />} />
            </Routes>
      </header>
    </div>
  );
}

export default App;