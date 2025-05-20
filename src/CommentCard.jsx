import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

const CommentCard = (props) => {
  return (
    <div className = "comment-card">
      <p>{props.comment.author}</p>
      <p>{props.comment.created_at}</p>
      <GoChevronDown className="down-vote" role="img" aria-label="dislike" />
      <GoChevronUp className="up-vote" role="img" aria-label="like" />
      <span>votes: {props.comment.votes}</span>
      <p>{props.comment.body}</p>
    </div>
  );
};

export default CommentCard;

// body, author, created_at, votes
