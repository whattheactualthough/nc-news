import { getArticles } from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <ul className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </>
  );
};

export default ArticleList;
