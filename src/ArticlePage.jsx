import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import Votes from "./Votes";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        console.error("Failed to fetch article", err);
      })
      .finally(()=> {
        setIsLoading(false);
    })
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }


    return (
      <div>
        <h2>{article.title}</h2>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-page-image"
        ></img>
        <h3> author: {article.author}</h3>
        <p> topic: {article.topic}</p>
        <p> added: {article.created_at}</p>
        <p>{article.body}</p>
        <Link to = {`/articles/${article_id}/comments`}>
        <GoComment className="comment-img" role="img" aria-label="comments" />
        <span>{article.comment_count}</span>
        </Link>
        <Votes currentVotes = {article.votes} articleId = {article.article_id}/>
        
      </div>
    );
  };


export default ArticlePage;
