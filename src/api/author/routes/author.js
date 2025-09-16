'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::author.author', {
    config: {
        routes: [
            {
                method: 'GET',
                path: '/authors/short',
                handler: 'author.findShort',
                config: {
                    policies: [],
                    middlewares: [],
                },
            },
        ],
    },
});
