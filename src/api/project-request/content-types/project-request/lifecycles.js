'use strict';

const NOTIFICATION_EMAIL = 'maksym.bondarenko@tallium.com';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugin('email').service('email').send({
        to: NOTIFICATION_EMAIL, // TODO: change to the actual email
        replyTo: result.email,
        subject: 'New project request submitted',
        text: `A new project request has been submitted.

Name: ${result.fullName || 'N/A'}
Email: ${result.email || 'N/A'}
Company: ${result.company || 'N/A'}
Phone: ${result.phone || 'N/A'}
Message: ${result.message || 'N/A'}
Type: ${result.type || 'N/A'}
Page: ${result.page || 'N/A'}`,
        html: `
          <h2>New project request submitted</h2>
          <p><strong>Name:</strong> ${result.fullName || 'N/A'}</p>
          <p><strong>Email:</strong> ${result.email || 'N/A'}</p>
          <p><strong>Company:</strong> ${result.company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${result.phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${(result.message || 'N/A').replace(/\n/g, '<br>')}</p>
          <p><strong>Type:</strong> ${result.type || 'N/A'}</p>
          <p><strong>Page:</strong> ${result.page || 'N/A'}</p>
        `,
      });
    } catch (err) {
      console.error('[project-request] Failed to send notification email:', err);
    }
  },
};
