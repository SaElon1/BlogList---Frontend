import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

    const addBlog = async ( newBlog ) => {
      await blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
      })
    }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
     {!user && <LoginForm handleLogin={handleLogin}/>}
     {user && (
      <>
      <LogoutButton handleLogout={handleLogOut} userName={user.name}/>
      <BlogForm addBlog={addBlog}/>
      <BlogList blogs={blogs}/>
      </>
     )}
    </div>
  )
}

export default App