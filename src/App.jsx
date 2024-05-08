import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const blogFromRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 4000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

    const addBlog = async ( newBlog ) => {
      try {
      blogFromRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 4000)
    }catch (error){
      console.error(error)
      setNotificationMessage("information missing or error in adding the blog")
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 4000)
    }
    }

    const addLikes = async (id, updatedBlog) => {
      try{
        const returnedBlog = await blogService.updateLikes(id, updatedBlog)
        setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)))
      }catch(error){
        console.error('Error updating likes:', error)
  
      }
    }

    const removeBlog = async (id, removedBlog) => {
      try{
        await blogService.remove(id, removedBlog)
        setBlogs(blogs.filter(blog => blog.id !== removedBlog.id))
      }catch(error){
        console.error('Error removing blog:', error)
      }
    }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
     {!user && 
     <>
     <Notification message ={notificationMessage} type={notificationType}/>
     <LoginForm handleLogin={handleLogin}/>
     </>}
     {user && (
      <>
      <LogoutButton handleLogout={handleLogOut} username={user.name}/>
      <Notification message = {notificationMessage} type={notificationType}/>
      <Togglable buttonLabel = "new blog" ref={blogFromRef}>
      <BlogForm createBlog={addBlog}/>
      </Togglable>
      <BlogList blogs={blogs} addLikes={addLikes} removeBlog={removeBlog}/>
      </>
     )}
    </div>
  )
}

export default App