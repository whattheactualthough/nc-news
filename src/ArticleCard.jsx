import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { GoComment } from "react-icons/go";


const ArticleCard = (props) => {
 return (
   <div>
     <h2>{props.article.title}</h2>
   <p> author: {props.article.author}</p>
   <p>topic: {props.article.topic}</p>
  
   <GoComment className = "comment-img"
   role = "img"
   aria-label = "comments"/>
   <span>{props.article.comment_count}</span>
   <GoChevronDown className = "down-vote"
   role = "img"
   aria-label = "dislike"/>
   <GoChevronUp className = "up-vote"
   role = "img"
   aria-label = "like"/>
   <span>votes: {props.article.votes}</span>
   </div>
 );
};


export default ArticleCard;