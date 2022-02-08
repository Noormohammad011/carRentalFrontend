import React, { useState } from 'react'



const SearchBox = ({ navigate }) => {
//   const [keyword, setKeyword] = useState('')
  

//   const submitHandler = (e) => {
//     e.preventDefault()
//     if (keyword.trim()) {
//       navigate(`/search/${keyword}`)
//     } else {
//       navigate('/')
//     }
//   }

  return (
    // <form class='d-flex' onSubmit={submitHandler}>
    //   <input
    //     class='form-control me-2'
    //     type='text'
    //     name='q'
    //     onChange={(e) => setKeyword(e.target.value)}
    //     placeholder='Search Cars...'
    //     aria-label='Search'
    //   />
    //   <button class='btn btn-outline-success' type='submit'>
    //     Search
    //   </button>
    // </form>
      <div>{navigate}</div>
  )
}

export default SearchBox
