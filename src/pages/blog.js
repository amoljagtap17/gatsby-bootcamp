import React from 'react'

import Layout from '../components/layout'
import Head from '../components/head'

import { Link, graphql, useStaticQuery } from 'gatsby'
import blogStyles from './blog.module.scss'

const BlogPage = () => {

  const { allContentfulBlogPost } = useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }    
  `)

  // console.log('data', allMarkdownRemark)
  
  return (
    <Layout>
      <Head title="Blog" />
      <h1>My Blogs</h1>
      <ol className={blogStyles.posts}>
        {
          allContentfulBlogPost.edges.map((edge, index) => {
            return (
              <li key={index} className={blogStyles.post}>
                <Link to={`/blog/${edge.node.slug}`}>
                  <h2>{edge.node.title}</h2>
                  <p>{edge.node.publishedDate}</p>
                </Link>
              </li>
            )
          })
        }
      </ol>
    </Layout>
  )
}

export default BlogPage
