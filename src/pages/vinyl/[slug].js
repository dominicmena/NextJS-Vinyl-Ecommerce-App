import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import { useEffect } from "react";
import data from "../../../utils/data";
import Link from "next/link";
import Image from "next/image";

export default function VinylScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const vinyl = data.vinyl.find((x) => x.slug === slug);
  if (!vinyl) {
    return <div>Vinyl Not Found</div>;
  }
  useEffect(() => {}, []);
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
            Layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{vinyl.name}</h1>
            </li>
            <li>Genre: {vinyl.genre} </li>
            <li>Artist: {vinyl.artist}</li>
            <li>
              {vinyl.rating} of {vinyl.numReviews}
            </li>

            <li>Description: {vinyl.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${vinyl.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{vinyl.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
              </div>
              <button className="primary-button w-full">Add to Cart</button>
            </div>
          </div>
        </div>
      
    </Layout>
  );
}
