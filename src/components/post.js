import React from 'react'
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from './post_layout'
import SEO from './seo'
import Button from './button'

const PostTime = (props) => {
  return <i {...props}/>
}

const PrevNextButtons = ({ prev, next }) => {

  return (
  <div>
    { (prev != null) && (
      <a href={`${prev.slug}`} rel="prev">
        <Button>
          ← { prev.title }
        </Button>
        </a>) }
    { (next != null) && (
      <a href={`${next.slug}`} rel="next">
        <Button>
          { next.title } →
        </Button>
        </a>) }
    </div>)
}

const Post = ({ pageContext: { next, prev }, data: { post } }) => {
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description || post.excerpt}
      />
      <PostTime>{post.date}</PostTime>
      <MDXRenderer>{post.body}</MDXRenderer>
      <PrevNextButtons {...{next, prev}} />
    </Layout>
  )
}

export default Post
