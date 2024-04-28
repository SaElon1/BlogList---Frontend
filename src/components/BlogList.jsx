import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, addLikes, removeBlog }) => {
  const compareLikes = (blogA, blogB) => {
    return blogB.likes - blogA.likes
  }

  const sortedBlogs = blogs.slice().sort(compareLikes)
  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default BlogList
