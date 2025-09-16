'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  // Перевизначаємо метод find для додавання populate автора з аватаром
  async find(ctx) {
    const { query } = ctx;

    // Додаємо populate для автора з аватаром
    const entity = await strapi.entityService.findMany('api::article.article', {
      ...query,
      populate: {
        ...query.populate,
        author: {
          fields: ['id', 'name', 'email'],
          populate: {
            avatar: {
              fields: ['url', 'name', 'alternativeText'],
            },
          },
        },
      },
    });

    return entity;
  },

  // Перевизначаємо метод findOne для додавання populate автора з аватаром
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    // Додаємо populate для автора з аватаром
    const entity = await strapi.entityService.findOne('api::article.article', id, {
      ...query,
      populate: {
        ...query.populate,
        author: {
          fields: ['id', 'name', 'email'],
          populate: {
            avatar: {
              fields: ['url', 'name', 'alternativeText'],
            },
          },
        },
      },
    });

    return entity;
  },
}));
