const Blog = ({ blog, addLikes }) => {

  const handleLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes +1}
    await addLikes(blog.id, updatedBlog)
  }
  return (
  <div>
    {blog.title} {blog.author}
    <p>likes: {blog.likes}
    <button onClick={handleLike}>like</button>
    </p>
  </div> 
  )
  }

export default Blog