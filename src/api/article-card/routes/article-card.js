module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/article-cards',
      handler: 'article-card.getArticleCards',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
