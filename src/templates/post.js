import React from 'react'
import { graphql } from "gatsby"

import Post from '../components/post'

export default (props) => (
  <Post {...props}/>
)

export const pageQuery = graphql`
  query($id: String!) {
    post: posts(id: { eq: $id }) {
      id
      title
      description
      date(formatString: "dddd, MMMM Do YYYY")
      excerpt
      body
      headings {
        value
      }
    }
  }
`
