'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::author.author', ({ strapi }) => ({
    async findShort(ctx) {
        const authors = await strapi.entityService.findMany('api::author.author', {
            fields: ['id', 'name'],
            populate: {
                avatar: {
                    fields: ['url', 'name'],
                },
            },
        });

        ctx.body = authors;
    },
}));
