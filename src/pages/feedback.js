import React from 'react'
import ReactUtterences from 'react-utterances'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Row, Col, Jumbotron, Button } from 'reactstrap'

const Feedback = () => (
  <Layout>
    <SEO title="Feedback" />
    <Jumbotron className="no-background">
      <h1 className="display-6"><img src="/icon/feedback.svg" className="mr-3"></img>Feedback</h1>
      <blockquote className="blockquote">
        <p className="mb-0">"We all need people who will give us feedback. That’s how we improve."</p>
        <footer className="blockquote-footer">Bill Gates</footer>
    </blockquote>
    <Button outline color="primary" href="https://github.com/phantauth/phantauth-feedback/issues">Create issue on GitHub</Button>
    </Jumbotron>

    <ReactUtterences repo={"phantauth/phantauth-feedback"} type='issue-number' issueNumber="1" />
  </Layout>
)

export default Feedback
