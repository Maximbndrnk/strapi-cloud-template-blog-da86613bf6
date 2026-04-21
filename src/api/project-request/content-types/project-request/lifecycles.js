'use strict';

const NOTIFICATION_EMAIL = 'maksym.bondarenko@tallium.com, info@tallium.com';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugin('email').service('email').send({
        to: NOTIFICATION_EMAIL, // TODO: change to the actual email
        replyTo: NOTIFICATION_EMAIL,
        subject: 'New project request submitted',
        text: `A new project request has been submitted.

Name: ${result.fullName || 'N/A'}
Email: ${result.email || 'N/A'}
Company: ${result.company || 'N/A'}
Phone: ${result.phone || 'N/A'}
Message: ${result.message || 'N/A'}
Type: ${result.type || 'N/A'}
Page: ${result.page || 'N/A'}
UTM Campaign: ${result.utm_campaign || 'N/A'}
UTM Medium: ${result.utm_medium || 'N/A'}
UTM Source: ${result.utm_source || 'N/A'}
User Country: ${result.user_country || 'N/A'}
User IP: ${result.user_ip || 'N/A'}`,
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
                    <td style="padding:8px 0;color:#111827;">${result.fullName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Email</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Company</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.company || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Phone</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Type</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.type || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Page</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.page || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Campaign</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.utm_campaign || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Medium</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.utm_medium || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Source</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.utm_source || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User Country</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.user_country || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User IP</strong></td>
                    <td style="padding:8px 0;color:#111827;">${result.user_ip || 'N/A'}</td>
                  </tr>
                </table>

                <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e5e7eb;">
                  <p style="margin:0 0 8px;color:#6b7280;"><strong>Message</strong></p>
                  <p style="margin:0;line-height:1.6;color:#111827;">${(result.message || 'N/A').replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error('[project-request] Failed to send notification email:', err);
    }
  },
};
