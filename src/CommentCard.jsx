import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { useUser } from "./contexts/User";

const CommentCard = (props) => {
  const { user } = useUser();

  const isAuthor = user.isLoggedIn && props.comment.author === user.username;

  return (
    <div className="comment-card">
      <p>{props.comment.author}</p>
      <p>{props.comment.created_at}</p>
      <GoChevronDown className="down-vote" role="img" aria-label="dislike" />
      <GoChevronUp className="up-vote" role="img" aria-label="like" />
      <span>votes: {props.comment.votes}</span>
      <p>{props.comment.body}</p>
      {isAuthor && (
        <button onClick={() => props.handleDelete(props.comment.comment_id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CommentCard;
