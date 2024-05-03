import React from "react"
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test('renders title and author', () => {
    const blog = {
        title: 'Test Title',
        author: 'Tester',
        likes: 1000,
        url: 'www.test.fi',
        user: {
            name: 'test name'
        }
        }
    const { container } = render(<Blog blog={blog}/>)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Test Title by Tester')

})

test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Test Title',
        author: 'Tester',
        likes: 1000,
        url: 'www.test.fi',
        user: {
            name: 'test name'
        }
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} addLikes={mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

