import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import AddCommentForm from "./AddCommentForm";
import { GoComment, GoCommentDiscussion } from "react-icons/go";
import Votes from "./Votes";
import NotFound from "./NotFound";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [errorStatus, setErrorStatus] = useState();

  const toggleCommentFormVisibility = (event) => {
    setIsCommentFormVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
          if (err.response?.status === 404) {
          setErrorStatus(404);
        } else {
          setErrorStatus("generic");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

 if (errorStatus === 404) {
    return <NotFound />;
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

      <Link to={`/articles/${article_id}/comments`}>
        <GoComment className="comment-img" role="img" aria-label="comments" />
        <span>{article.comment_count}</span>
      </Link>

      <button
        aria-label="Add comment"
        onClick={toggleCommentFormVisibility}
        className="add-comment-button"
        role="button"
      >
        {" "}
        Add comment
      </button>
      <GoCommentDiscussion />
      {isCommentFormVisible && (
        <AddCommentForm
          toggleCommentFormVisibility={toggleCommentFormVisibility}
          articleId = {article_id}
        />
      )}

      <Votes currentVotes={article.votes} articleId={article.article_id} />
    </div>
  );
};

export default ArticlePage;
