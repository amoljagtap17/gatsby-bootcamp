const path = require('path')

// Not needed with Contentful

/* module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    // console.log(JSON.stringify(node, undefined, 4))
    const slug = path.basename(node.fileAbsolutePath, '.md')
    // console.log('--------', slug)

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
} */

module.exports.createPages = async ({ graphql, actions}) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/blog.js')

  /* const response = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }     
  `) */

  const response = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }     
  `)

  response.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}
