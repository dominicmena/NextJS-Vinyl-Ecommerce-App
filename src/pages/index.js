
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
import Vinyl from '../../models/Vinyl'

import db from '../../utils/db'
import { Store } from '../../utils/Store'


export default function Home({vinyl}) {

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
<Layout title='Home Page'> 
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
  return {
    props: {
      vinyl: vinyl.map(db.convertDocToObj)
    }
  }
}
