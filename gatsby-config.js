module.exports = {
  siteMetadata: {
    title: `PhantAuth Developer`,
    description: `Random User Generator + OpenID Connect Provider. Like Lorem Ipsum, but for user accounts and authentication.`,
    author: `Iván Szkiba`,
    domain: process.env.PHANTAUTH_DOMAIN,
    serviceUri: process.env.PHANTAUTH_SERVICE_URI,
    developerPortalUri: process.env.PHANTAUTH_DEVELOPER_PORTAL_URI,
    defaultTenantUri: process.env.PHANTAUTH_DEFAULT_TENANT_URI
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PhantAuth Developer`,
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
