module.exports = {
  siteMetadata: {
    title: `PhantAuth - Random User Generator + OpenID Connect Provider`,
    description: `Random User Generator + OpenID Connect Provider. Like Lorem Ipsum, but for user accounts and authentication.`,
    author: `Iván Szkiba`,
    domain: process.env.PHANTAUTH_DOMAIN,
    serviceUri: process.env.PHANTAUTH_SERVICE_URI || ("https://" + process.env.PHANTAUTH_DOMAIN),
    developerPortalUri: process.env.PHANTAUTH_DEVELOPER_PORTAL_URI || ("https://www." + process.env.PHANTAUTH_DOMAIN),
    defaultTenantUri: process.env.PHANTAUTH_DEFAULT_TENANT_URI || ("https://default" + process.env.PHANTAUTH_DOMAIN)
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PhantAuth - Random User Generator + OpenID Connect Provider`,
        short_name: `PhantAuth`,
        start_url: `/`,
        background_color: `#864a05`,
        theme_color: `#864a05`,
        display: `fullscreen`,
        icon: `static/logo/phantauth-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
