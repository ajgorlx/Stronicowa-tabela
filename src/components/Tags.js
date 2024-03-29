import React from 'react'

const Tags = ({ tags, loading, handlePerPageChange, tagsPerPage }) => {
    if(loading) {
        return <h2>Loading...</h2>;
    }

  return (
  <div>
  <label id="PerPageInput">Elements per page:</label>
  <select
  className='form-select form-select-sm'
  style={{ width: "200px" }}
  aria-label='form-select-sm example'
  id="PerPageInput"
  type="number"
  min="1"
  value={tagsPerPage}
  onChange={handlePerPageChange}
  >
    {[...Array(10)].map((_, index) => (
        <option key={index + 1} value={index + 1}>
            {index + 1}
        </option>
    ))}
  </select>
  <table className='table table-striped'>
  <thead>
    <tr>
        <th scope="col" style={{ width: '50%' }}>
            Tag Name
        </th>
        <th scope="col" style={{ width: '50%' }}>
            Count
        </th>
    </tr>
  </thead>
  <tbody>
  {tags.map((tag, index) => (
    <tr key={index}>
    <td>{tag.name}</td>
    <td>{tag.count}</td>
    </tr>
  ))}
  </tbody>
  </table>
  </div>
  )
}
export default Tags;
