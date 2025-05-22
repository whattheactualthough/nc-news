import { useState } from "react";
import { postCommentById } from "../api";
import LoadingSpinner from "../LoadingSpinner";

const AddCommentForm = ({ toggleCommentFormVisibility, articleId }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      setIsSubmitting(true);
      setIsLoading(true);
      const newComment = {
        body: comment,
        username: "grumpy19",
      };

      if (isLoading) {
        return <LoadingSpinner loading={isLoading} />;
      }

      postCommentById(articleId, {
        body: comment,
        username: "grumpy19",
      })
        .then((res) => {
          setStatus("success");
          setComment("");
        })
        .catch((error) => {
          setStatus("error");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };
  

  return (
    <>
      {!status && (
        <form id="post-comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment-input-box" className="comment-input-box">
            What do you think?
          </label>
          <input
            id="comment-input-box"
            type="text"
            value={comment}
            onChange={handleChange}
            placeholder="Write your comment here..."
            required
          />
          <button
            id="post-comment-button"
            aria-label="Add comment"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : "Post comment"}
          </button>
        </form>
      )}
      {status && (
        <div
          className={status === "success" ? "success-message" : "error-message"}
        >
          {status === "success"
            ? "Comment posted successfully"
            : "Error posting comment"}
        </div>
      )}
    </>
  );
};

export default AddCommentForm;
