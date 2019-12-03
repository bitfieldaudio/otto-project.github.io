module.exports = {
  siteMetadata: {
    title: 'OTTO Documentation',
    description: ''
  },
  plugins: [
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
        plugins: [
          'gatsby-remark-images'
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              language: "mermaid",
              theme: "neutral",
              viewport: {
                width: 1200,
                height: 1200
              },
              mermaidOptions: {
                themeCSS: ` { background: white; } * {
                                  font-size: 14px;
                                  stroke-width: 1px;
                                  margin: 0;
                                  padding: 0;
                                  font-family: "Source Code Pro", Menlo, monospace;

                              }`
              }
            }
          },
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/docs`,
        name: 'docs'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            subsets: [`latin`],
            variants: [`400`, `700`],
          },
          {
            family: `Source Code Pro`,
            variants: [`400`, `700`],
          },
        ],
      },
    },
  ]
}
