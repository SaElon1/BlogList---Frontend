import React, {useState} from 'react'

const BlogForm = ( {addBlog} ) => {
    const [newTitle, setNewTitle] = useState([])
    const [newUrl, setNewUrl] = useState([])
    const [newAuthor, setNewAuthor] = useState([])


    const handleSubmit = (event) => {
        event.preventDefault()

        addBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
      <div>
        <h2>create a new blog</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
            title
            <input
            type = "text"
            value = {newTitle}
            name = "Title"
            onChange = {({target}) => setNewTitle(target.value)}
            />
            <div>
              author
              <input
              type = "text"
              value = {newAuthor}
              name = "Author"
              onChange = {({target}) => setNewAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
              type = "text"
              value = {newUrl}
              name = "Url"
              onChange={({target}) => setNewUrl(target.value)}
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
