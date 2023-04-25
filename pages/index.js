import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import CryptoList from '@/components/CryptoList';



export default function Home({coins}) {

  
  return (
    <>
      <Head>
        <title>Crpto Price Updates</title>
        <meta name="description" content="Crypto Price Updates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       <Layout>
         <Hero />
         <CryptoList coins={coins.coins}/>
       </Layout>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=50&currency=EUR");
  const data = await res.json();

  return {
    props: {
      coins: data
    }
  }
}
