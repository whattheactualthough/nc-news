import { useState } from "react";
import { Routes, Route, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import ArticleList from "./ArticleList";
import ArticlePage from "./ArticlePage";
import Header from "./Header.jsx";
import Comments from "./Comments";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = Object.keys(loggedInUser).length > 0;

  return (
    <div>
      <div>
        <h1>NC News</h1>
        <Header />

        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/articles/:article_id/comments" element={<Comments />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
