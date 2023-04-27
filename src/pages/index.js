
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
import Vinyl from '../../models/Vinyl'

import db from '../../utils/db'
import { Store } from '../../utils/Store'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Link from 'next/link'


export default function Home({vinyl, featuredVinyl}) {

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = async(vinyl) => {
    const existItem = cart.cartItems.find((x) => x.slug === vinyl.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/vinyls/${vinyl._id}`)

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Item out of stock')
        
    }
dispatch ({type: 'CART_ADD_ITEM', payload: {...vinyl, quantity}})
toast.success('Product added to cart')
}


  return (
<Layout title='Home Page' > 
    <Carousel showThumbs={false} transitionTime={500} autoPlay width={900} infiniteLoop={true} className='flex justify-center' >
    {featuredVinyl.map((vinyl) => (
      <div key={vinyl._id} className='flex w-auto'>
        <Link href={`/vinyl/${vinyl.slug}`}>
        <img src={vinyl.banner} alt={vinyl.name} />
        </Link>
      </div>
    ))}
    

    </Carousel> <h2 className='text-[20px] my-4 font-bold'>Latest Vinyl</h2>
  <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
    {vinyl.map((vinyl) => (
      <ProductItem vinyl={vinyl} key={vinyl.slug}
      addToCartHandler={addToCartHandler}></ProductItem>
    ))}
  </div>
</Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const vinyl = await Vinyl.find().lean();
  const featuredVinyl = await Vinyl.find({isFeatured: true}).lean();
  return {
    props: {
      featuredVinyl: featuredVinyl.map(db.convertDocToObj),
      vinyl: vinyl.map(db.convertDocToObj)
    }
  }
}

// exports a default function called "Home" that takes in two arguments: "vinyl" and "featuredVinyl". It then uses React's useContext hook to access the global state of the application and pulls out the "cart" object from it.

// The function defines an "addToCartHandler" function that is used to add items to the cart. This function first checks if the item already exists in the cart by searching for its slug. If it does, it increments the quantity of the item by one; otherwise, it sets the quantity to one.

// Next, the function makes a request to an API endpoint using Axios to retrieve the count of the item in stock. If there isn't enough stock to fulfill the requested quantity, the function displays an error message using the "toast" utility.

// If there is enough stock, the function dispatches an action to add the item to the cart and displays a success message using "toast".

// The function then returns a JSX block that renders a carousel of featured vinyl items, followed by a grid of all the available vinyl items, using the "ProductItem" component to display each item.

// Finally, the code exports a server-side function called "getServerSideProps" that retrieves the vinyl data from a database and returns it as props for the "Home" component to use when rendering.