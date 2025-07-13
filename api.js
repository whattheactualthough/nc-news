import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://lulu-newsroom.onrender.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  const params = {
    ...(topic && { topic }),
    ...(sort_by && { sort_by }),
    ...(order && { order }),
  };

  return ncNewsApi.get("/articles", { params }).then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleById = (articleId, inc_votes) => {
  return ncNewsApi.patch(`articles/${articleId}`, inc_votes).then((res) => {
    return res.data.article.votes;
  });
};

export const postCommentById = (articleId, comment) => {
  return ncNewsApi
    .post(`articles/${articleId}/comments`, comment)
    .then((res) => {
      return res.data;
    });
};

export const deleteCommentById = (comment_id) => {
  return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then((res) => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTopics = () => {
  return ncNewsApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};
