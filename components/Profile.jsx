import React from 'react'

const Profile = ({name, desc,data, handleEdit, handleDelete}) => {
  return (
    <div>{name} {desc}</div>
  )
}

export default Profile