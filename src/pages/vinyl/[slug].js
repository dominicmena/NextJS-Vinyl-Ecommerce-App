import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../../components/Layout'
import { useEffect } from 'react'
import data from '../../../utils/data'

export default function VinylScreen() {
    const {query} = useRouter()
    const{slug} = query
    const vinyl = data.vinyl.find(x => x.slug === slug)
    if(!vinyl){
        return <div>Vinyl Not Found</div>
    }
    useEffect(() => {
        
    }, [])
  return (
    <Layout title={vinyl.name}>
        <h1>{vinyl.name}</h1>
    </Layout>
  )
}
