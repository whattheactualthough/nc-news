import { getArticles } from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "../LoadingSpinner";
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import TopicsNavbar from "./TopicsNavbar";

const ArticleList = ({sortBy, order}) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const {topic} = useParams()
  
  useEffect(() => {
    getArticles(topic, sortBy, order)
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <>
    <h2>{topic ? `Articles on ${topic}` : 'All Articles'}</h2>
      <ul className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </>
  );
};

export default ArticleList;
