import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const[posts, setposts]=useState([]);
  useEffect(()=>{
    fetch('https://api.rarible.org/v0.1/items/byCollection?collection=ETHEREUM:0x23581767a106ae21c074b2276d25e5c3e136a68b')
    .then((response)=>response.json())
    .then(data=>{
      console.log(data)
      setposts(data.items);
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }, [])
  return (
    <div className='post-grid'>

    {posts.map((post)=>{
      return(
        <div className='post' key={post.id}>
          <h1>Token Id: {post.tokenId}</h1>
          <p>Blockchain: {post.blockchain}
          <br/>
             Creator: {post.creators[0].account}</p>
          {/* <Image src={post.meta.content[0].url} width={200} height={200}/> */}
         <img className="nft-img" src={post.meta.content[0].url}/>
        </div>
       
      
      )
    })}

    </div>
  )
}
