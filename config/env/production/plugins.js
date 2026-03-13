module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'no-reply@example.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'no-reply@example.com'),
      },
    },
  },
});
