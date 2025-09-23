'use strict';

/**
 * news-subscriber service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-subscriber.news-subscriber');
