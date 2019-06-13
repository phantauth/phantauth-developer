import { useStaticQuery, graphql } from "gatsby"

export const meta = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            domain
            serviceUri
            developerPortalUri
            defaultTenantUri
          }
        }
      }
    `
  )
  return site.siteMetadata
}
