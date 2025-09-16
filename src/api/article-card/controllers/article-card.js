'use strict';

/**
 * A set of functions called "actions" for `article-card`
 */

module.exports = {
  getArticleCards: async (ctx, next) => {
    try {
      // Спочатку спробуємо без фільтрів для діагностики
      const articles = await strapi.documents('api::article.article').findMany({
        fields: ['id', 'title', 'description', 'slug', 'featured', 'createdAt'],
        populate: {
          cover: {
            fields: ['url', 'name', 'alternativeText'],
          },
          author: {
            fields: ['id', 'name'],
            populate: {
              avatar: {
                fields: ['url', 'name'],
              },
            },
          },
          category: {
            fields: ['id', 'name', 'slug'],
          },
          tags: {
            fields: ['id', 'name'],
          },
        },
        // Фільтри для отримання статей для карток
        filters: {
          // Прибираємо фільтр по publishedAt, оскільки статті можуть бути не опубліковані
          // publishedAt: {
          //     $notNull: true,
          // },
        },
        sort: { publishedAt: 'desc' }, // Сортування по даті
        limit: 10, // Обмеження кількості
      });

      // Форматуємо дані відповідно до вимог
      const formattedArticles = articles.map(article => ({
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.slug,
        featured: article.featured,
        publishedAt: article.publishedAt,
        cover: article.cover ? {
          url: article.cover.url,
          name: article.cover.name,
          alternativeText: article.cover.alternativeText,
        } : null,
        author: article.author ? {
          id: article.author.id,
          name: article.author.name,
          avatar: article.author.avatar ? {
            url: article.author.avatar.url,
            name: article.author.avatar.name,
          } : null,
        } : null,
        category: article.category ? {
          id: article.category.id,
          name: article.category.name,
          slug: article.category.slug,
        } : null,
        tags: article.tags ? article.tags.map(tag => ({
          id: tag.id,
          name: tag.name,
        })) : [],
      }));

      ctx.body = {
        data: formattedArticles,
      };
    } catch (err) {
      ctx.body = {
        error: 'An error occurred while fetching the article cards data',
        details: err instanceof Error ? err.message : 'Unknown error',
      };
      ctx.status = 500;
    }
  }
};
