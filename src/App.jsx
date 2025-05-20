import { useState } from "react";
import { Routes, Route, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import ArticleList from "./ArticleList";
import ArticlePage from "./ArticlePage";
import Header from "./Header";
import Comments from "./Comments";

function App() {


  return (
    <div>
      <h1>NC News</h1>
      <Header />

      <Routes>
        <Route path= "/" element = {<ArticleList/>}/>
        <Route path= "/articles/:article_id" element={<ArticlePage />}/>
        <Route path= "/articles/:article_id/comments" element={<Comments/>}/>
      </Routes>
    </div>

  );
}

export default App;
