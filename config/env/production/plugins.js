module.exports = ({ env }) => {
  const rawPort = env.int('SMTP_PORT', 587);
  const port = Number.isFinite(rawPort) && rawPort > 0 ? rawPort : 587;
  const secure = env.bool('SMTP_SECURE', false);

  return {
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp-relay.brevo.com'),
          port,
          secure,
          requireTLS: !secure,
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('EMAIL_DEFAULT_FROM'),
          defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', env('EMAIL_DEFAULT_FROM')),
        },
      },
    },
  };
};
