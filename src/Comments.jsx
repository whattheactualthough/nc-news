import { getCommentsByArticleId } from "../api";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      });
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div>
      <ul className="comments-list">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </div>
  );
};

export default Comments;

// list of comments by article id
