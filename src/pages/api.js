import React from 'react'
import { RedocStandalone } from 'redoc';

import Layout from '../components/layout'
import SEO from '../components/seo'

const Api = () => (
  <Layout>
    <SEO title="API" />
    <RedocStandalone
      specUrl="/api.yaml"
      options={{
        nativeScrollbars: true,
        hideLoading: true,
        disableSearch: true,
        scrollYOffset: "60",
        theme: { colors: {primary: { main: '#864a05' }} },
      }}
    />
  </Layout>
)

export default Api
