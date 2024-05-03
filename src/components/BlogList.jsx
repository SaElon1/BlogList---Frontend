import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, addLikes, removeBlog }) => {

  BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }
  const compareLikes = (blogA, blogB) => {
    return blogB.likes - blogA.likes
  }

  const sortedBlogs = blogs.slice().sort(compareLikes)
  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
      <ul className='boarders' key={blog.id}>
        <Blog blog={blog} addLikes={addLikes} removeBlog={removeBlog}/>
        </ul>
      )}
    </div>
  )
}

export default BlogList
