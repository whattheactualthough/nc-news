import { getArticles } from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "../LoadingSpinner";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticles()
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

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
