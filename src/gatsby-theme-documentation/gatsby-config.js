module.exports = options => {
  const { mdx = true, contentPath = 'docs' } = options

  return {
    plugins: [
      'gatsby-plugin-meta-redirect',
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-redirects',
      mdx && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          remarkPlugins: [require('remark-slug'), require('remark-emoji')],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 1035,
                sizeByPixelDensity: true,
              },
            },
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: 'language-',
                inlineCodeMarker: null,
                showLineNumbers: true,
                aliases: {},
              },
            },
          ],
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentPath,
          name: contentPath
        }
      }
    ]
      .filter(Boolean)
  }
}
