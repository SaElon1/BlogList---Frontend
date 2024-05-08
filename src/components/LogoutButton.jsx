import React from 'react'

const LogoutButton = ({ handleLogout, username }) => {
  return (
      <div>
          <p>{username} logged in
          <button onClick={handleLogout}>Logout</button>
          </p>
      </div>
  )
}

export default LogoutButton
