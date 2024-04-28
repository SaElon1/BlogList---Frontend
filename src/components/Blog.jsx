const Blog = ({ blog, addLikes, removeBlog}) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const loggedUser = JSON.parse(loggedUserJSON)
  const loggedUsername = loggedUser.username


  const handleLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes +1}
    await addLikes(blog.id, updatedBlog)
  }

  const handleRemoveBlog = async () => {
    if (blog.user.username === loggedUsername) {
      if(window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
        await removeBlog(blog.id, blog)
      }
    } else {
      alert('')
    }
  }
  return (
  <div>
    {blog.title} {blog.author}
    <p>likes: {blog.likes}
    <button onClick={handleLike}>like</button>
    </p>
    <div>
    <p>
      {blog.user.username}
      {loggedUsername === blog.user.username && (
        <button onClick={handleRemoveBlog}>delete</button>
      )}
    </p>
    </div>
  </div> 
  )
  }

export default Blog