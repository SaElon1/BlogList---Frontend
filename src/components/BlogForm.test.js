import React from "react"
import {render, screen} from '@testing-library/react'
import'@testing-library/jest-dom'
import BlogForm from "./BlogFrom"
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls createBlog with right information on submit', async() =>{
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const {container} = render(<BlogForm createBlog={createBlog}/>)

    const title = container.querySelector('#title-input')
    const author = container.querySelector('#author-input')
    const url = container.querySelector('#url-input')
    const sendButton = screen.getByText('create')

    await user.type(title, 'Test title')
    await user.type(author, "Tester")
    await user.type(url, 'www.test.fi')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toHaveBeenCalledWith({
        title: 'Test title',
        author: 'Tester',
        url: 'www.test.fi'
    })
} )


