module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/author-simplified',
     handler: 'author-simplified.getSimplifiedAuthors',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
