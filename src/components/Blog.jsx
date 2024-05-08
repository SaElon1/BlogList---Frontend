import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog}) => {
  const [loggedUsername, setLoggedUsername] = useState(null)

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const loggedUser = JSON.parse(loggedUserJSON)
  if (loggedUser){
  setLoggedUsername(loggedUser.username)
  }
  }, [])

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  const handleLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes +1}
    await addLikes(blog.id, updatedBlog)
  }

  const handleRemoveBlog = async () => {
    if (blog.user.username === loggedUsername) {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await removeBlog(blog.id, blog)
      }
    }
  }
  return (
  <div>
    <ul className='blog'>
    {blog.title} by {blog.author}
    <p>{blog.url}</p>
    <p>likes: {blog.likes}
    <button onClick={handleLike}>like</button>
    </p>
    </ul>
    <ul>
    <p>
      added by {blog.user.name}
      </p>
      {loggedUsername === blog.user.username && (
        <button onClick={handleRemoveBlog}>remove</button>
      )}
    </ul>
  </div> 
  )
  }

export default Blog