import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h2
      style={{
        textAlign: 'center',
        fontSize: '6rem',
      }}
    >
    Hello World...
    </h2>
  </Layout>
)

export default IndexPage
