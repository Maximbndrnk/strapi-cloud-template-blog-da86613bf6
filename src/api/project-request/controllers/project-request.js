'use strict';

/**
 * project-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project-request.project-request', ({ strapi }) => ({
  async updateStepperData(ctx) {
    const { id } = ctx.params;

    if (!id) {
      return ctx.badRequest('project-request id is required');
    }

    const requestData = ctx.request.body?.data || {};
    const data = {
      budget: requestData.budget,
      timeline: requestData.timeline,
      sources: requestData.sources,
      sourcesOtherDescription: requestData.sourcesOtherDescription
    };

    const entity = await strapi.entityService.update('api::project-request.project-request', id, {
      data
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));

