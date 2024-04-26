import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, addLikes }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} />
      )}
    </div>
  )
}

export default BlogList
