module.exports = {
  siteMetadata: {
    title: `PhantAuth Developer`,
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
        name: `PhantAuth`,
        short_name: `PhantAuth`,
        start_url: `/`,
        background_color: `#864a05`,
        theme_color: `#864a05`,
        display: `fullscreen`,
        icon: `static/logo/phantauth-logo.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/docs/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia-docsearch`,
      options: {
        apiKey: "f5000379dc5e53c4b1f5c66dfd5c1b85",
        indexName: "phantauth",
        inputSelector: "#search",
        debug: false
      }
    }    
  ],
}
