import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { patchArticleById } from "../api";
import { useUser } from "./contexts/User";

const Votes = ({ currentVotes, articleId }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(currentVotes);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("null");
  const {user} = useUser()

  useEffect(() => {
    setVotes(currentVotes);
  }, [currentVotes]);

  const postVote = (articleId, voteType) => {
    setHasVoted(true);
    const patchRequest = { inc_votes: voteType };
    patchArticleById(articleId, patchRequest)
      .then((confirmedVotes) => {
      })
      .catch((err) => {
        setVotes((currentVotes) => currentVotes - 1);
        setHasVoted(false);
        setIsError(true);
        setErrorMessage("Vote failed, please try again")
      });
  };

  const handleUpVote = () => {
    if (!hasVoted && user.isLoggedIn) {
      setVotes((currentVotes) => currentVotes + 1);
      postVote(articleId, 1);
    }
  };

  const handleDownVote = () => {
    if (!hasVoted && user.isLoggedIn) {
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
        <GoChevronUp className="up-vote cursor-pointer text-gray-600 hover:text-green-800 transition-transform duration-200 hover:scale-140" role="button" aria-label="like" />
      </button>

      <button
        onClick={handleDownVote}
        style={{background: "none", border: "none", cursor: "pointer" }}
        aria-label="Like"
        disabled={hasVoted}
      >
        <GoChevronDown
          className="down-vote cursor-pointer text-gray-600 hover:text-red-800 transition-transform duration-200 hover:scale-140"
          role="button"
          aria-label="dislike"
        />
      </button>
       {!user.isLoggedIn && (
            <p
              className="text-sm text-gray-600"
            >
              Please log in to vote on this article.
            </p>
          )}
          <span className="text-sm text gray-600">votes: {votes}</span>
      <p className="text-sm text gray-600">{hasVoted? "you have voted on this article" : null}</p>
      <p> {isError? `${errorMessage}` : null}</p>
    </div>
  );
};

export default Votes;
