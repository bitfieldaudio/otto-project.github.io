module.exports = {
  siteMetadata: {
    title: 'OTTO Documentation',
    description: ''
  },
  plugins: [
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-redirects',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
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
        path: 'docs',
        name: 'docs'
      }
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
    }
  ]
}
