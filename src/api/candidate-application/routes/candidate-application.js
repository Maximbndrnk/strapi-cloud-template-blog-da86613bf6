'use strict';

/**
 * candidate-application router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::candidate-application.candidate-application', {
  config: {
    create: {
      auth: false
    }
  }
});
