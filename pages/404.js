import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
      <Layout>
    <div className='container'>
        <div className="--center-all">
            <h2>Opps! Looks like you're lost.</h2>
            <p>
                It appears this page does not exist.
            Please go back to home
            </p>
            <br />
            <Link href={"/"}>
                <button className="--btn --btn-primary">
                    Back to home
                </button>
            </Link>
        </div>
    </div>
    </Layout>
  )
}

export default notFound
