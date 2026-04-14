'use strict';

module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/project-requests/:id/stepper-data',
      handler: 'project-request.updateStepperData',
      config: {
        auth: false
      }
    }
  ]
};
