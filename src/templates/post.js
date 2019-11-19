/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from '../components/post_layout'
import SEO from '../components/seo'
import Button from '../components/button'
import YouTube from '../components/youtube'

const PostTime = (props) => {
  return <i {...props}/>
}

const PrevNextButtons = ({ prev, next }) => {

  return (
  <div>
    { (prev != null) && (
      <a sx={{ float: 'left' }} href={`${prev.slug}`} rel="prev">
        <Button>
          ← { prev.title }
        </Button>
        </a>) }
    { (next != null) && (
      <a sx={{ float: 'right' }} href={`${next.slug}`} rel="next">
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
      { post.featuredVideo && <YouTube videoId={post.featuredVideo}/> }
      <PostTime>{post.date}</PostTime>
      <MDXRenderer>{post.body}</MDXRenderer>
      <PrevNextButtons {...{next, prev}} />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query($id: String!) {
    post: posts(id: { eq: $id }) {
      id
      title
      description
      date(formatString: "dddd, MMMM Do YYYY")
      excerpt
      body
      featuredVideo
      headings {
        value
      }
    }
  }
`
