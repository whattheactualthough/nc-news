import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import AddCommentForm from "./AddCommentForm";
import { GoComment, GoCommentDiscussion } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import Votes from "./Votes";
import NotFound from "./NotFound";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [errorStatus, setErrorStatus] = useState();
  const isValidId = /^\d+$/.test(article_id);
  const [error, setError] = useState(null);

  const toggleCommentFormVisibility = (event) => {
    setIsCommentFormVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    if (!isValidId) {
      setError({ code: 400, message: "Invalid article ID" });
      setIsLoading(false);
      return;
    }
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        const code = err.response?.status || 500;
        const message = err.response?.data?.msg || "Something went wrong.";
        setError({ code, message });
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  if (error) {
    return <NotFound statusCode={error.code} message={error.message} />;
  }

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden mb-6 ">
      <h2 className="text-gray-600 font-bold p-4 text-2xl transition">
        {article.title}
      </h2>

      <div className="w-full aspect-video">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div className="p-4 text-sm text-gray-600 flex flex-wrap gap-4 font semi-bold">
        <p className="text-sm text-gray-600">
          by {article.author} |{" "}
          {new Date(article.created_at).toLocaleDateString()} | {article.topic}
        </p>
      </div>
      <div className="flex gap-4 ml-auto justify-end-safe items-start">
        <div className="flex gap-1 cursor-pointer hover:text-gray-600">
          <Link to={`/articles/${article_id}/comments`}>
            <GoComment
              className="text-gray-500 transition-transform duration-200 
                hover:scale-125 hover:text-green-400"
              role="img"
              aria-label="comments"
            />
            <span className="text-sm hover:scale-125 hover:text-green-400">
              {article.comment_count} comments
            </span>
          </Link>

          <div>
          
            <GoCommentDiscussion 
            className="text-gray-500 transition-transform duration-200 
                hover:scale-125 hover:text-green-400"/>
              <button
              aria-label="Add comment"
              onClick={toggleCommentFormVisibility}
              className="text-sm text-gray-600 hover:scale-125 hover:text-green-400"
              role="button"
            >
              add comment
            </button>
            {isCommentFormVisible && (
              <AddCommentForm
                toggleCommentFormVisibility={toggleCommentFormVisibility}
                articleId={article_id}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4 text-gray-600 gap-2">
          <Votes currentVotes={article.votes} articleId={article.article_id} />
        </div>
      </div>
      <div className="px-4 pb-4 mt-2">
        <p className="text-gray-700 text-sm">{article.body}</p>
      </div>
    </div>
  );
};
//     <div>
//       <h2 className="bg-red-500">{article.title}</h2>

//       <img
//         src={article.article_img_url}
//         alt={article.title}
//         className="article-page-image"
//       ></img>
//       <h3> author: {article.author}</h3>

//       <p> topic: {article.topic}</p>

//       <p> added: {article.created_at}</p>
//       <p>{article.body}</p>

//       <Link to={`/articles/${article_id}/comments`}>
//         <GoComment className="comment-img" role="img" aria-label="comments" />
//         <span>{article.comment_count}</span>
//       </Link>

//       <button
//         aria-label="Add comment"
//         onClick={toggleCommentFormVisibility}
//         className="add-comment-button"
//         role="button"
//       >
//         {" "}
//         Add comment
//       </button>
//       <GoCommentDiscussion />
//       {isCommentFormVisible && (
//         <AddCommentForm
//           toggleCommentFormVisibility={toggleCommentFormVisibility}
//           articleId={article_id}
//         />
//       )}

//
//     </div>
//   );
// };

export default ArticlePage;
