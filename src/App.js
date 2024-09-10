import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FirstweekWork from "./classOperations/FirstweekWork";
import List from "./movie/List";
import MovieDetails from "./movie/MovieDetails";
import Booka from "./Library/Booka";
import BookDetails from "./Library/BookDetails";
// import "./App.css";

// this is the function or the component entery point, this will run all code place inside it.
function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<FirstweekWork />} />
          <Route path="/movie/list" element={<List />} />
          <Route path="/movie/info/:id" element={<MovieDetails />} />
          <Route path="/book/all" element={<Booka />} />
          <Route path="/book/details/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

// this export App component, make it accessable to other component
// meaning it can be used by other component.
export default App;
