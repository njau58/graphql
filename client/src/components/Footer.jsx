import React from 'react'

const Footer = () => {
  return (
    <div className='text-gray-500   py-12 text-sm   my-44 text-center'> &copy; {new Date().getFullYear()}<a className='ml-2 hover:underline hover:text-blue-500' href='https://softleafapplications.com' rel='noreferrer'  target='_blank'>SoftLeaf Applications </a> .All rights reserved.</div>
  ) 
}

export default Footer