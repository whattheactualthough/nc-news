import { Link } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { useState, useEffect } from "react";
import { getArticleById } from "../api";
import Votes from "./Votes";

const ArticleCard = (props) => {
  const [article, setArticle] = useState(null);


  useEffect(() => {
    let isActive = true
    getArticleById(props.article.article_id)
      .then((data) => {
        if (isActive) 
        {setArticle(data)};
      })
      .catch((err) => console.log("Failed to fetch snippet", err));
    return () => {
      isActive = false;
    };
  }, [props.article.article_id]);

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden mb-6 hover-underline">
      <Link to={`/articles/${props.article.article_id}`}>
        <h2 className="text-gray-600 font-bold p-4 text-2xl no-underline hover:underline underline-offset-2 transition">
          {props.article.title}
        </h2>
      </Link>
      <div className="w-full aspect-video">
        <img
          src={props.article.article_img_url}
          alt={props.article.title}
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div className="p-4 text-sm text-gray-600 flex flex-wrap gap-4 font semi-bold">
        <p className="text-sm text-gray-600">
          by {props.article.author} |{" "}
          {new Date(props.article.created_at).toLocaleDateString()} |{" "}
          {props.article.topic}
        </p>
      </div>
      <div className="flex gap-4 ml-auto justify-end-safe items-start">
        <div className="flex gap-1 cursor-pointer hover:text-gray-600">
          <GoComment
            className="text-gray-500 transition-transform duration-200 
            hover:scale-125"
            role="img"
            aria-label="comments"
          />
          <span className="text-sm">{props.article.comment_count}</span>
        </div>
        <div className="flex items-center justify-between px-4 pb-4 text-gray-600 gap-2">
          <Votes currentVotes={props.article.votes} articleId={props.article.article_id} />
          
        </div>
      </div>
      <div className="px-4 pb-4 mt-2">
      {article?.body? (<p className="text-gray-700 text-sm line-clamp-3">
        {article.body}
      </p>) : (null)}
      </div>
    </div>
  );
};

export default ArticleCard;

