'use strict';

/**
 * A set of functions called "actions" for `author-simplified`
 */

module.exports = {
  getSimplifiedAuthors: async (ctx, next) => {
    try {
      // Використовуємо Strapi Document Service API для отримання даних
      const authors = await strapi.documents('api::author.author').findMany({
        fields: ['id', 'name'],
        populate: {
          avatar: {
            fields: ['url', 'name'],
          },
        },
      });

      ctx.body = {
        data: authors,
      };
    } catch (err) {
      ctx.body = {
        error: 'An error occurred while fetching the authors data',
        details: err instanceof Error ? err.message : 'Unknown error',
      };
      ctx.status = 500;
    }
  }
};
