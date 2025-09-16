'use strict';

/**
 * A set of functions called "actions" for `article-card`
 */

module.exports = {
  getArticleCards: async (ctx, next) => {
    try {
      // Отримуємо query параметри для фільтрації
      const { 
        category, 
        author, 
        tags, 
        topics,
        industries,
        featured, 
        published, 
        sort = 'createdAt:desc', 
        limit = 10,
        start = 0 
      } = ctx.query;

      // Будуємо фільтри динамічно
      const filters = {};

      // Фільтр по категорії
      if (category) {
        filters.category = {
          slug: category
        };
      }

      // Фільтр по автору
      if (author) {
        filters.author = {
          id: author
        };
      }

      // Фільтр по тегах
      if (tags) {
        const tagIds = Array.isArray(tags) ? tags : tags.split(',');
        filters.tags = {
          id: {
            $in: tagIds
          }
        };
      }

      // Фільтр по топіках
      if (topics) {
        const topicIds = Array.isArray(topics) ? topics : topics.split(',');
        filters.topics = {
          id: {
            $in: topicIds
          }
        };
      }

      // Фільтр по індустріях
      if (industries) {
        const industryIds = Array.isArray(industries) ? industries : industries.split(',');
        filters.industries = {
          id: {
            $in: industryIds
          }
        };
      }

      // Фільтр по featured
      if (featured !== undefined) {
        filters.featured = featured === 'true';
      }

      // Фільтр по published
      if (published === 'true') {
        filters.publishedAt = {
          $notNull: true
        };
      }

      // Парсимо sort параметр
      const sortArray = sort.split(':');
      const sortField = sortArray[0];
      const sortOrder = sortArray[1] || 'desc';
      const sortObj = { [sortField]: sortOrder };

      // Використовуємо Strapi Document Service API для отримання даних
      const articles = await strapi.documents('api::article.article').findMany({
        fields: ['id', 'title', 'description', 'slug', 'featured', 'createdAt', 'publishedAt'],
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
          topics: {
            fields: ['id', 'name'],
          },
          industries: {
            fields: ['id', 'name'],
          },
        },
        filters,
        sort: sortObj,
        limit: parseInt(limit),
        offset: parseInt(start),
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
        topics: article.topics ? article.topics.map(topic => ({
          id: topic.id,
          name: topic.name,
        })) : [],
        industries: article.industries ? article.industries.map(industry => ({
          id: industry.id,
          name: industry.name,
        })) : [],
      }));

      // Отримуємо загальну кількість для пагінації
      const totalCount = await strapi.documents('api::article.article').count({
        filters,
      });

      ctx.body = {
        data: formattedArticles,
        meta: {
          pagination: {
            page: Math.floor(parseInt(start) / parseInt(limit)) + 1,
            pageSize: parseInt(limit),
            pageCount: Math.ceil(totalCount / parseInt(limit)),
            total: totalCount,
          },
        },
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
