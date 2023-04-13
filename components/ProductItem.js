import Link from 'next/link'
import React from 'react'


export default function ProductItem({vinyl , addToCartHandler }) {
  return (
    <div className='card'>
        <Link href={`/vinyl/${vinyl.slug}`}>
            <img 
            src={vinyl.image}
            alt={vinyl.name}
            className='rounded shadow'
            />
        </Link>
        <div className='flex flex-col items-center justify-center p-5'>
            <Link href={`/vinyl/${vinyl.slug}`}>

            <h2 className='text-lg'>
                {vinyl.name}
            </h2>

            </Link>
            <p className='mb-2'>{vinyl.artist}</p>
            <p>${vinyl.price}</p>
            <button className='primary-button' type='button' onClick={() => addToCartHandler(vinyl)}>
                Add to Cart
            </button>
        </div>
    </div>
  )
}
