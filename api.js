import axios from "axios";


const ncNewsApi = axios.create({
 baseURL: "https://lulu-newsroom.onrender.com/api"
});


export const getArticles = () => {
   return ncNewsApi.get("/articles").then((res) => {
       return res.data.articles;
     });
};

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
        return res.data.article
    })
};

export const getCommentsByArticleId = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`).then((res) => {
        return res.data.comments
    })
}

export const patchArticleById = ({articleId, inc_votes}) => {
    return ncNewsApi.patch(`articles/${articleId}`, inc_votes).then((res)=>{
        return res.data.article.votes
    })
}




