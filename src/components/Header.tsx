import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='z-10 bg-medb w-screen py-4 px-4 sticky top-0 left-0'>
        <div className='w-full max-w-screen-xl mx-auto text-white flex flex-row justify-between items-center'>
            <h1 className='font-bold text-xl'>Deteksi Plagiarisme Algoritma Rabin Karp dan Rolling Hash</h1>
            {/* <Link className='cursor-pointer py-2 px-4 bg-white text-black rounded-lg' href={"/"}>Home</Link> */}
        </div>
    </div>
  )
}

export default Header