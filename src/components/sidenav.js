/** @jsx jsx */
import { jsx } from 'theme-ui'
import { AccordionNav } from './sidenav-accordion'
import { StaticQuery, graphql } from 'gatsby'
import NavLink from './nav-link'
import { Location } from '@reach/router'

const makeTree = nodes => {
  var tree = [];
  if (!nodes) return;
  const paths = nodes.map(node => {
    // remove first / and split path
    var path = node.slug.substr(1).split("/")
    path.shift()
    return {...node, path}
  })
  paths.forEach( node => {
    var current = tree
    var treeNode = null;
    for (const part of node.path) {
      treeNode = current.find(tn => tn.path === part)
      if (!treeNode) {
        treeNode = {
          path: part,
          node: null,
          children: [],
        }
        current.push(treeNode);
      }
      current = treeNode.children
    }
    if (!treeNode) {
      treeNode = {
        path: [],
        node: null,
        children: [],
      }
      tree.push(treeNode);
    }
    treeNode.node = node
  });
  return tree;
}

function treeNode(tree) {
  return (
  <li mdxType="li">
    <a mdxType="a" href={ tree.node.slug }>{ tree.node.title }</a>
    { treeNodes(tree.children) }
  </li>
  )
}

function treeNodes(tree) {
  if (!tree) return null
  const children = tree.map(treeNode);
  return <ul mdxType="ul" children={children}/>
}

const render = (data, props) => {
  const tree = makeTree(data.docs.nodes)
  const children = treeNodes(tree);
  return (
    <Location
      children={({ location }) => (
        <AccordionNav {...props } components={{ a: NavLink}} pathname={location.pathname} children={children}/>
        )}
        />)
}

const query = graphql`
{
  docs: allDocs(sort: { fields: slug, order: ASC }) {
    nodes {
      id
      slug
      title
    }
  }
}
`

export default (props) => {
  const renderWithProps = (data, calledProps) => render(data, props)
  return (
    <StaticQuery
      query={ query }
      render={ renderWithProps }
    />
  )
}

