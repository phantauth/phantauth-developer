import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Uptime = () => (
  <Layout>
    <SEO title="Status" />
    <div class="p-0 m-0">
    <iframe
      class="p-0 m-0 border-0"
      title="Status"
      width="100%"
      height="1280"
      src="https://stats.uptimerobot.com/RLLDMf1ZL"
    />
    </div>
  </Layout>
)

export default Uptime
