'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import NavLinks from './NavLinks'
import Image from 'next/image'
import NavMenu from './NavMenu'

const Navbar = () => {
  const { data: session } = useSession()
  const userID = session?.user?._id

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className='w-full bg-light-1 dark:bg-dark-2 border-b border-light-3 dark:border-dark-3'>

      <div className='max-w-6xl mx-auto flex justify-between items-center px-2 py-6'>

        <Link href='/' className='flex justify-center items-center gap-3 '>
          <img
            src='/coding.png'
            alt='cognicode_logo'
            className='w-8 h-8 object-contain'
          />
          <h2 className='font-bold text-2xl'>
            COGNICODE
          </h2>
        </Link>

        <NavLinks user={userID} />

        <div className='flex items-center gap-3'>

          <button
            onClick={toggleTheme}
            className='w-10 h-10 max-sm:w-8 max-sm:h-8 flex items-center justify-center hover:bg-light-3 dark:hover:bg-dark-4 rounded-full transition-colors'
          >
            <img
              src={theme === 'light' ? '/dark-mode.png' : '/light-mode.png'}
              alt='theme toggle'
              className='w-10 h-10 object-contain dark:invert dark:brightness-200'
            />
          </button>

          <Link href={userID ? '/profile' : '/login'}>
            <img
              src='/profile.png'
              alt='profile'
              className='w-10 h-10 max-sm:w-8 max-sm:h-8 object-contain'
            />
          </Link>

          <NavMenu user={userID} />
        </div>
      </div>


    </div>
  )
}

export default Navbar