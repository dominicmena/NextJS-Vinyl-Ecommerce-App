import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../../../utils/Store";
import db from "../../../utils/db";
import Vinyl from "../../../models/Vinyl";
import axios from "axios";
import { toast } from "react-toastify";

//useContext allows props to be passed freely without needing to be passed at every level

export default function VinylScreen(props) {
    const { vinyl } = props
    const {state, dispatch} = useContext(Store)
    const router = useRouter()
  if (!vinyl) {
    return <Layout title={'Vinyl Not Found'}>Vinyl Not Found</Layout>;
  }
  

const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find((x) => x.slug === vinyl.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/vinyls/${vinyl._id}`)

    if (data.countInStock < quantity) {
return toast.error ('Sorry item out of stock')
    }
dispatch ({type: 'CART_ADD_ITEM', payload: {...vinyl, quantity}})
router.push('/cart')
}



  return (
    <Layout title={vinyl.name}>
      <div className="py-2">
        <Link href="/">back to all vinyl</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={vinyl.image}
            alt={vinyl.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{vinyl.name}</h1><br></br>
            </li>
            <li>Genre: {vinyl.genre} </li><br></br>
            <li>Artist: {vinyl.artist}</li><br></br>
            <li>
             Rating: {vinyl.rating} of {vinyl.numReviews} reviews
            </li><br></br>

            <li>Description: {vinyl.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price:</div>
              <div>${vinyl.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status:</div>
                <div>{vinyl.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
              </div>
              <button className="primary-button w-full" onClick={addToCartHandler}>Add to Cart</button>
            </div>
          </div>
        </div>
      
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const vinyl = await Vinyl.findOne({ slug }).lean() //lean converts to JSON
  await db.disconnect()
  return {
    props: {
      vinyl: vinyl ? db.convertDocToObj(vinyl) : null,
    },
  }
}

