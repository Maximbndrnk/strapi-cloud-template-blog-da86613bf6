'use strict';

const COMPANY_LOGO_URL = 'https://essential-festival-ec0ced78b0.media.strapiapp.com/Logo_ca9d96a651.svg';
const LINKEDIN_URL = 'https://essential-festival-ec0ced78b0.media.strapiapp.com/in_faebae4f27.png';
const INSTAGRAM_URL = 'https://essential-festival-ec0ced78b0.media.strapiapp.com/i_bfd81deb80.png';
const FACEBOOK_URL = 'https://essential-festival-ec0ced78b0.media.strapiapp.com/f_1412217fc6.png';
const LINKEDIN_PAGE_URL = 'https://www.linkedin.com/company/tallium-inc.';
const INSTAGRAM_PAGE_URL = 'https://www.instagram.com/tallium_inc/';
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/talliuminc/';


const buildEmailPayload = () => ({
  text: 'We received your CV and will contact you shortly.',
  html: `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:0;background:#F3F3F3;">
      <tr>
        <td align="center" style="padding:24px 16px;background:#F3F3F3;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;">
            <tr>
              <td align="center" style="padding:0 0 20px 0;">
                <img src="${COMPANY_LOGO_URL}" alt="Tallium logo" style="display:block;max-width:140px;width:140px;height:auto;border:0;" />
              </td>
            </tr>

            <tr>
              <td style="background:#FFFFFF;border-radius:12px;padding:32px 22px;">
                <h1 style="margin:0 0 28px 0;font-family:Roboto,sans-serif;font-size:26px;line-height:130%;font-weight:700;color:#161616;">
                  Thank You for Your Application to Tallium <span style="font-weight:400;">&#129505;</span>
                </h1>

                <p style="margin:0 0 16px 0;font-family:Roboto,sans-serif;font-size:20px;line-height:140%;font-weight:400;color:#161616;">
                  Dear Candidate,
                </p>

                <p style="margin:0 0 12px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  Thank you for your interest in joining Tallium and for taking the time to apply. We truly appreciate your attention to our company and your desire to become part of our team.
                </p>
                <p style="margin:0 0 12px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  We will carefully review your profile, and if your experience and background align with our current opportunities, we will reach out to discuss the next steps.
                </p>
                <p style="margin:0 0 32px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  Thank you once again for considering Tallium. We wish you every success in your career journey!
                </p>

                <p style="margin:0;text-align:center;font-family:Roboto,sans-serif;font-size:18px;line-height:130%;font-weight:700;color:#161616;">
                  Kind regards,<br />
                  Tallium Team
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#161616;border-radius:12px;padding:22px 20px;">
                  <tr>
                    <td align="center" style="padding:0 0 18px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:700;color:#FFFFFF;">
                      Get to Know Us Better &#128071;
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="33.33%" valign="top" style="padding-right:8px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${LINKEDIN_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${LINKEDIN_URL}" alt="Linkedin icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Linkedin</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Company news, updates, and industry insights.</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="33.33%" valign="top" style="padding-left:4px;padding-right:4px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${INSTAGRAM_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${INSTAGRAM_URL}" alt="Instagram icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Instagram</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Meet our team and get a glimpse of our culture. &#128522;</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="33.33%" valign="top" style="padding-left:8px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${FACEBOOK_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${FACEBOOK_URL}" alt="Facebook icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Facebook</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Follow us for more updates and company news</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
