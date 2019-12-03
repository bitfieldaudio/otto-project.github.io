const crypto = require(`crypto`)
const path = require(`path`)
const { joinPath } = require(`gatsby-core-utils`)

let basePath
let docsPath
let postsPath

const DocTemplate = require.resolve('./src/templates/doc')
const PostTemplate = require.resolve('./src/templates/post')
const RedirectTemplate = require.resolve('./src/templates/redirect')

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })

  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })

  return result
}

const mdxFindTitle = async (source, args, context, info) => {
  if (source.title.length > 0) return source.title;
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })

  const resolver = type.getFields()['headings'].resolve
  const result = await resolver(mdxNode, args, context, { fieldName: `headings` })

  if (!result || !result[0]) return "";

  return result[0]['value'];
}

exports.onPreBootstrap = (_, themeOptions) => {
  basePath = themeOptions.basePath || `/`
  docsPath = themeOptions.docsPath || `docs`
  postsPath = themeOptions.postsPath || `posts`
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes(
    schema.buildObjectType({
      name: `Docs`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!`, resolve: mdxFindTitle },
        description: { type: `String`, },
        slug: { type: `String!`, },
        headings: {
          type: `[MdxHeadingMdx!]`,
          resolve: mdxResolverPassthrough(`headings`),
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`],
    }))
  createTypes(
    schema.buildObjectType({
      name: `Posts`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!`, resolve: mdxFindTitle },
        date: { type: `Date`, },
        description: { type: `String`, },
        slug: { type: `String!`, },
        featuredVideo: { type: `String`, },
        headings: {
          type: `[MdxHeadingMdx!]`,
          resolve: mdxResolverPassthrough(`headings`),
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
      },
      interfaces: [`Node`],
    })
  )
}

exports.onCreateNode = async ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink, createRedirect } = actions

  const isReadme = name => /readme/i.test(name)
  const isIndexPath = name => name === 'index' || isReadme(name)

  const toOriginalDocsPath = (node, type) => {
    const { dir } = path.parse(node.relativePath)
    const fullPath = [
      basePath,
      type.toLowerCase(),
      dir,
      node.name
    ]
    return joinPath(...fullPath).replace(/\\+/g, ``)
  }
  const toDocsPath = (node, type) => {
    const { dir } = path.parse(node.relativePath)
    const fullPath = [
      basePath,
      type.toLowerCase(),
      dir,
      !isIndexPath(node.name) && node.name
    ].filter(Boolean)
    return joinPath(...fullPath).replace(/\\+/g, ``)
  }

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to docsPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (source === docsPath || source == postsPath) {

    const type = source == docsPath && 'Docs' || 'Posts';
    const slug = toDocsPath(fileNode, type)

    // Redirect file/path/readme to file/path/ in order to handle
    // potential links that are meant to work with GitHub-style index
    // pages.
    if (isReadme(fileNode.name)) {
      createRedirect({
        fromPath: toOriginalDocsPath(fileNode, type),
        toPath: toDocsPath(fileNode, type),
        isPermanent: true
      })
    }

    const title = node.frontmatter.title
    const date = node.frontmatter.date
    const description = node.frontmatter.description
    const featuredVideo = node.frontmatter.featuredVideo

    const fieldData = { title, description, slug, date, featuredVideo }
    const mdxDocId = createNodeId(`${node.id} >>> ${type}`)

    await createNode({
      ...fieldData,
      id: mdxDocId,
      parent: node.id,
      children: [],
      internal: {
        type: type,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: type,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxDocId) })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    {
      docs: allDocs {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const docs = result.data.docs.nodes

  docs.forEach((doc, index) => {
    const prev = index === docs.length - 1 ? null : docs[index + 1]
    const next = index === 0 ? null : docs[index - 1]
    const { slug } = doc

    createPage({
      path: slug,
      component: DocTemplate,
      context: {
        ...doc,
        prev,
        next,
      },
    })
  })

  const postsResult = await graphql(`
    {
      posts: allPosts(sort: { fields: date, order: ASC }) {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)

  if (postsResult.errors) {
    reporter.panic(postsResult.errors)
  }

  const posts = postsResult.data.posts.nodes

  posts.forEach((post, index) => {
    const prev = index === 0 ? null : posts[index - 1]
    const next = index === posts.length - 1 ? null : posts[index + 1]
    const { slug } = post

    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        ...post,
        prev,
        next,
      },
    })
  })

  const createRedirectPage = (from, to) => {
    createPage({
      path: from,
      component: RedirectTemplate,
      context: {
        from,
        to
      }
    })
  }

  createRedirectPage('/discord', 'https://discord.gg/4cV9Ucz')
  createRedirectPage('/patreon', 'https://patreon.com/ottosynthesizer')
  createRedirectPage('/github', 'https://github.com/otto-project/otto')
  createRedirectPage('/instagram', 'https://instagram.com/ottosynthesizer')

  createRedirect({
        fromPath: '/',
        toPath: '/docs/',
        isPermanent: true,
        redirectInBrowser: true,
      })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}
