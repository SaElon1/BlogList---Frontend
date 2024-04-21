import React from 'react'

const LogoutButton = ({ handleLogout, userName }) => {
  return (
      <div>
          <p>{userName} logged in
          <button onClick={handleLogout}>Logout</button>
          </p>
      </div>
  )
}

export default LogoutButton
