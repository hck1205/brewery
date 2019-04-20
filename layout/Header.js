import Head from 'next/head'
import React from "react";

export default () => (
  <div>
    <Head>
      <title>Brewery Dictionary</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href={"/static/css/index.css"} />
    </Head>
  </div>
)