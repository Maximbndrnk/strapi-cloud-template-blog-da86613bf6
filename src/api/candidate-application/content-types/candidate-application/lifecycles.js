'use strict';

const COMPANY_LOGO_URL = 'https://essential-festival-ec0ced78b0.media.strapiapp.com/Logo_ca9d96a651.svg';

const buildEmailPayload = () => ({
  text: 'We received your CV and will contact you shortly.',
  html: `
    <div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#111827;color:#ffffff;text-align:center;">
          <img src="${COMPANY_LOGO_URL}" alt="Company logo" style="display:inline-block;max-height:48px;max-width:220px;height:auto;width:auto;" />
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:#111827;">Thank you for your application</h2>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">
            We received your CV and will contact you in a short period.
          </p>
        </div>
      </div>
    </div>
  `
});

module.exports = {
  async afterCreate(event) {
    const candidateApplicationId = event?.result?.id;

    if (!candidateApplicationId) {
      console.error('[candidate-application] Cannot send email: missing record id');
      return;
    }

    try {
      const candidateApplication = await strapi.entityService.findOne(
        'api::candidate-application.candidate-application',
        candidateApplicationId
      );

      const recipientEmail = candidateApplication?.email;

      if (!recipientEmail) {
        console.error(`[candidate-application] Cannot send email: missing email for id=${candidateApplicationId}`);
        return;
      }

      await strapi.plugin('email').service('email').send({
        to: recipientEmail,
        replyTo: 'info@tallium.com',
        subject: 'We received your CV',
        ...buildEmailPayload()
      });
    } catch (error) {
      console.error('[candidate-application] Failed to send confirmation email:', error);
    }
  }
};
