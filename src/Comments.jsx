import { getCommentsByArticleId } from "../api";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router-dom";
import { deleteCommentById } from "../api";

const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((res) => {
        setComments(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      }, [comments]);
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  const handleDelete = (commentId) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log(error, "Error deleting comment:", error);
      });
  };

  return (
    <div>
      <div>{isDeleted && <p>Comment deleted successfully</p>}</div>
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;

