/** @jsx jsx */
import { StaticQuery, graphql } from "gatsby"
import { jsx } from 'theme-ui'
import YouTube from './youtube'

const linkStyle = {
  textDecoration: 'none',
  color: 'text',
  display: 'block',
}

const wrapperStyle = {
  backgroundColor: 'muted',
  marginBottom: '32px',
  borderRadius: '5px',
  color: 'text',
  overflow: 'hidden',
}

const blockStyle = {
  p: '16px',
  color: 'text',
}

const titleStyle = {
  m: '0px',
}

const dateStyle = {
  fontStyle: 'italic',
  float: 'right',
  marginRight: '10px',
}

const excerptStyle = {
  marginTop: '20px'
}

const BlogPost = (props) => {
  const post = props.node
  return (
  <a sx={linkStyle} href={post.slug}>
    <div sx={wrapperStyle} >
      { post.featuredVideo && <YouTube videoId={post.featuredVideo}/> }
      <div sx={blockStyle} >
        <div sx={dateStyle}>{ post.date }</div>
        <h1 sx={titleStyle} >{ post.title }</h1>
        { post.excerpt && <div sx={excerptStyle}>{ post.excerpt }</div> }
      </div>
    </div>
  </a>)
}

const render = (data, props) => {
  const children = data.posts.nodes.map( (node) => <BlogPost node={ node } />)
  return children
}

const query = graphql`
{
  posts: allPosts(sort: { fields: date, order: DESC }) {
    nodes {
      id
      slug
      title
      date(formatString: "dddd, MMMM Do YYYY")
      excerpt
      featuredVideo
    }
  }
}
`

export default () => (
  <StaticQuery
    query={ query }
    render={ render }
    />
)

