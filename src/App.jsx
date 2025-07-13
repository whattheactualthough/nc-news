import { useState, useEffect } from "react";
import { Routes, Route, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import ArticleList from "./ArticleList";
import ArticlePage from "./ArticlePage";
import Header from "./Header.jsx";
import Comments from "./Comments";
import TopicsNavbar from "./TopicsNavbar.jsx";
import NotFound from "./NotFound.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = Object.keys(loggedInUser).length > 0;
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  return (
    <div>
      <div>
        <h1>NC News</h1>
        <Header
          selectedTopic={selectedTopic}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />

        <Routes>
          <Route path="/" element={<ArticleList sortBy={sortBy} order={order} />} />
          <Route path="/articles" element={<ArticleList sortBy={sortBy} order={order} />} />
          <Route path="/articles/topics/:topic" element={<ArticleList sortBy={sortBy} order={order} />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/articles/:article_id/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
