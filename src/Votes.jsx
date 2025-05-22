import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { patchArticleById } from "../api";

const Votes = ({ currentVotes, articleId }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(currentVotes);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setVotes(currentVotes);
  }, [currentVotes]);

  const postVote = (articleId, voteType) => {
    setHasVoted(true);
    const patchRequest = { inc_votes: voteType };
    patchArticleById(articleId, patchRequest)
      .then((confirmedVotes) => {
        console.log(confirmedVotes);
      })
      .catch((err) => {
        setVotes((currentVotes) => currentVotes - 1);
        setHasVoted(false);
        setIsError(true);
        setErrorMessage("Vote failed, please try again")
      });
  };

  const handleUpVote = () => {
    if (!hasVoted) {
      setVotes((currentVotes) => currentVotes + 1);
      postVote(articleId, 1);
    }
  };

  const handleDownVote = () => {
    if (!hasVoted) {
      setVotes(currentVotes - 1);
      postVote(articleId, -1);
    }
  };

  return (
    <div>
      <button
        onClick={handleUpVote}
        style={{ background: "none", border: "none", cursor: "pointer" }}
        aria-label="Like"
        disabled={hasVoted}
      >
        <GoChevronUp className="up-vote" role="button" aria-label="like" />
      </button>

      <button
        onClick={handleDownVote}
        style={{background: "none", border: "none", cursor: "pointer" }}
        aria-label="Like"
        disabled={hasVoted}
      >
        <GoChevronDown
          className="down-vote"
          role="button"
          aria-label="dislike"
        />
      </button>
      <p>{hasVoted? "you have voted on this article" : null}</p>
      <span>votes: {votes}</span>
      <p> {isError? `${errorMessage}` : null}</p>
      <p>{hasVoted? "You have voted on this article" : null}</p>
    </div>
  );
};

export default Votes;
