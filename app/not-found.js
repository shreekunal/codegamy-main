import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div className='min-h-[70vh] flex flex-col justify-center items-center'>
      <h1 className='text-7xl font-bold mb-12'>
        404 | Page not found
      </h1>
      <Link href='/' className='text-white bg-accent hover:bg-accent-dark py-3 px-6 rounded-xl transition-colors'>
        Back to Home
      </Link>
    </div>
  )
}

export default page