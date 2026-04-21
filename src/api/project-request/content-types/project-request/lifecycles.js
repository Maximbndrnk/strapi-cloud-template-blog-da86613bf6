'use strict';

const NOTIFICATION_EMAIL = 'maksym.bondarenko@tallium.com, info@tallium.com';
const EMAIL_DELAY_MS = 2 * 60 * 1000;

const withFallback = (value) => value || 'N/A';

const buildEmailPayload = (projectRequest) => ({
  text: `A new project request has been submitted.

Name: ${withFallback(projectRequest.fullName)}
Email: ${withFallback(projectRequest.email)}
Company: ${withFallback(projectRequest.company)}
Phone: ${withFallback(projectRequest.phone)}
Message: ${withFallback(projectRequest.message)}
Type: ${withFallback(projectRequest.type)}
Page: ${withFallback(projectRequest.page)}
UTM Campaign: ${withFallback(projectRequest.utm_campaign)}
UTM Medium: ${withFallback(projectRequest.utm_medium)}
UTM Source: ${withFallback(projectRequest.utm_source)}
User Country: ${withFallback(projectRequest.user_country)}
User IP: ${withFallback(projectRequest.user_ip)}
Timeline: ${withFallback(projectRequest.timeline)}
Sources: ${withFallback(projectRequest.sources)}
Sources (Other): ${withFallback(projectRequest.sourcesOtherDescription)}`,
  html: `
    <div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#111827;color:#ffffff;">
          <h2 style="margin:0;font-size:20px;line-height:1.3;">New project request submitted</h2>
        </div>

        <div style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;width:180px;vertical-align:top;"><strong>Name</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Email</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Company</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.company)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Phone</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Type</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.type)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Page</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.page)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Campaign</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_campaign)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Medium</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_medium)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Source</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_source)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User Country</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.user_country)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User IP</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.user_ip)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Timeline</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.timeline)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Sources</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.sources)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Sources (Other)</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.sourcesOtherDescription)}</td>
            </tr>
          </table>

          <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#6b7280;"><strong>Message</strong></p>
            <p style="margin:0;line-height:1.6;color:#111827;">${withFallback(projectRequest.message).replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>
    </div>
  `,
});

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const projectRequestId = result?.id;

    if (!projectRequestId) {
      console.error('[project-request] Cannot schedule email: missing projectRequestId');
      return;
    }

    setTimeout(async () => {
      try {
        const freshProjectRequest = await strapi.entityService.findOne(
          'api::project-request.project-request',
          projectRequestId
        );

        if (!freshProjectRequest) {
          console.error(`[project-request] Record not found for delayed email, id=${projectRequestId}`);
          return;
        }

        const emailPayload = buildEmailPayload(freshProjectRequest);

        await strapi.plugin('email').service('email').send({
          to: NOTIFICATION_EMAIL, // TODO: change to the actual email
          replyTo: NOTIFICATION_EMAIL,
          subject: 'New project request submitted',
          ...emailPayload,
        });
      } catch (err) {
        console.error('[project-request] Failed to send delayed notification email:', err);
      }
    }, EMAIL_DELAY_MS);
  },
};
