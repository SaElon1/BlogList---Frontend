import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( {createBlog} ) => {
    const [newTitle, setNewTitle] = useState([])
    const [newUrl, setNewUrl] = useState([])
    const [newAuthor, setNewAuthor] = useState([])

    BlogForm.propTypes = {
      createBlog: PropTypes.func.isRequired
    }
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
      <div className='blogDiv'>
        <h2>create a new blog</h2>
        <div>
          <form onSubmit={addBlog}>
            <div>
            title
            <input
            type = "text"
            value = {newTitle}
            name = "Title"
            onChange = {({target}) => setNewTitle(target.value)}
            id ='title-input'
            />
            <div>
              author
              <input
              type = "text"
              value = {newAuthor}
              name = "Author"
              onChange = {({target}) => setNewAuthor(target.value)}
              id='author-input'
              />
            </div>
            <div>
              url
              <input
              type = "text"
              value = {newUrl}
              name = "Url"
              onChange={({target}) => setNewUrl(target.value)}
              id = 'url-input'
              />
            </div>
            <button type = "submit">create</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

export default BlogForm
