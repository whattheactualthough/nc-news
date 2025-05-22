import { useState } from "react";
import { postCommentById } from "../api";

const AddCommentForm = ({ toggleCommentFormVisibility, articleId }) => {
  const [comment, setComment] = useState("");
    const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      setIsSubmitting(true);
      const newComment = {
        body: comment,
        username: "grumpy19",
      };

      postCommentById(articleId, newComment)
        .then((res) => {
          setSubmissionStatus("Comment posted");
          console.log(submissionStatus);
          setComment("");
        })
        .catch(() => {
          setSubmissionStatus("error");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      alert("Please enter a comment.");
    }
  };
  console.log("submissionStatus:", submissionStatus);
  return (
    <>
      <form id="post-comment-form">
        <label htmlFor="comment-input-box" className="comment-input-box">
          What do you think?
        </label>
        <input
          id="comment-input-box"
          type="text"
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment here...?"
          required
        />
        <button
          id="post-comment-button"
          aria-label="Add comment"
          type="button"
          onClick={(event) => {
            handleSubmit(event);
            toggleCommentFormVisibility(event);
          }}
        >
          Post comment
        </button>
      </form>
      {submissionStatus === "Comment posted" ? (
        <div className="success-message">Comment posted successfully!</div>
      ) : submissionStatus === "error" ? (
        <div className="error-message">
          Failed to post comment. Please try again.
        </div>
      ) : null}
    </>
  );
};

export default AddCommentForm;
