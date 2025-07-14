import { useState } from "react";
import { postCommentById } from "../api";
import LoadingSpinner from "../LoadingSpinner";
import { useUser } from "./contexts/User";

const AddCommentForm = ({ toggleCommentFormVisibility, articleId }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.isLoggedIn) {
      setStatus("error");
      setErrorMessage("Please sign in to post a comment.");
      return;
    }

    if (!comment.trim()) {
      setStatus("error");
      setErrorMessage("Comment cannot be empty.");
      return;
    }

    if (comment.trim()) {
      setIsSubmitting(true);
      setIsLoading(true);
      const newComment = {
        body: comment,
        username: user.username,
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
    
      {!status || status === "error" ? (
        <form id="post-comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment-input-box">What do you think?</label>
          <input
            id="comment-input-box"
            type="text"
            value={comment}
            onChange={handleChange}
            placeholder="Write your comment here..."
            required
            disabled={!user.isLoggedIn}
          />

          <button type="submit" disabled={isSubmitting || !user.isLoggedIn}>
            {isSubmitting ? <LoadingSpinner /> : "Post comment"}
          </button>

          {!user.isLoggedIn && (
            <p
              className="signin-message"
              style={{
                color: "gray",
                marginTop: "4px",
                fontStyle: "italic",
                fontSize: "12px",
              }}
            >
              Please sign in to add a comment.
            </p>
          )}
          {status === "error" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </form>
      ) : (
        <p className="success-message">Comment posted successfully!</p>
      )}
    </>
  );
};

export default AddCommentForm;
