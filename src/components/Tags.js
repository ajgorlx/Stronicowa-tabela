import React from 'react'

const Tags = ({ tags, loading }) => {
    if(loading) {
        return <h2>Loading...</h2>;
    }

  return <ul className='list-group mb-4'>
  {tags.map((tag, index) => (
    <tr key={index} className='list-group-item'>
    <td>{tag.name}</td>
    <td>{tag.count}</td>
    </tr>
  ))}
  </ul>
  
}
export default Tags;
