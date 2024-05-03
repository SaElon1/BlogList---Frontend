import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, removeBlog}) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const loggedUser = JSON.parse(loggedUserJSON)
  const loggedUsername = loggedUser ? loggedUser.username : null

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
    <p>likes: {blog.likes}
    <button onClick={handleLike}>like</button>
    </p>
    </ul>
    <div>
    <p>
      {blog.user.name}
      {loggedUsername === blog.user.username && (
        <button onClick={handleRemoveBlog}>remove</button>
      )}
    </p>
    </div>
  </div> 
  )
  }

export default Blog