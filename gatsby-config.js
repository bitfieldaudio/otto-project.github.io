module.exports = {
  siteMetadata: {
    title: 'Gatsby Documentation Starter',
    description: 'This is a starter for gatsby-theme-documentation'
  },
  plugins: [
    {
      resolve: 'gatsby-theme-documentation',
      options: {
        mdx: false,
      },
    },
    {
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
        ],
      }
    },
  ]
}
