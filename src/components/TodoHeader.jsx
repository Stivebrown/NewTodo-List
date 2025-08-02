import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

const TodoHeader = ({title}) => {
  return (
    <>
    {/* <div className='w-[100%] py-8 bg-white shadow-md mb-8'>
      <h1 className='text-4xl font-bold text-purple-700 tracking-wide text-center'>Todo List</h1>
    
    </div> */}

    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="hover:underline" aria-label="Home page">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:underline" aria-label="About page">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

TodoHeader.propTypes = {
  title: PropTypes.string.isRequired,
}
export default TodoHeader;