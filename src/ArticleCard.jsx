import { Link } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { GoComment } from "react-icons/go";

const ArticleCard = (props) => {
  return (
    <div className = "article-card">
      <Link to={`/articles/${props.article.article_id}`}>
        <h2>{props.article.title}</h2>
      </Link>
      <img
        src={props.article.article_img_url}
        alt={props.article.title}
        className="article-image"
      ></img>
      <p> author: {props.article.author}</p>
      <p>topic: {props.article.topic}</p>
      <p> added: {props.article.created_at}</p>

      <GoComment className="comment-img" role="img" aria-label="comments" />
      <span>{props.article.comment_count}</span>
      <GoChevronDown className="down-vote" role="img" aria-label="dislike" />
      <GoChevronUp className="up-vote" role="img" aria-label="like" />
      <span>votes: {props.article.votes}</span>
    </div>
  );
};

export default ArticleCard;
