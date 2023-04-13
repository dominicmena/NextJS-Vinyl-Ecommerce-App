
import { Inter } from 'next/font/google'
import { Layout } from '../../components/Layout'
import ProductItem from '../../components/ProductItem'
import Vinyl from '../../models/Vinyl'
import data from '../../utils/data'
import db from '../../utils/db'

const inter = Inter({ subsets: ['latin'] })

export default function Home({vinyl}) {
  return (
<Layout title='Home Page'> 
  <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
    {vinyl.map((vinyl) => (
      <ProductItem vinyl={vinyl} key={vinyl.slug}></ProductItem>
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
