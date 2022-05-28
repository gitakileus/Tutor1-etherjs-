import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

declare let window: any;
const Home: NextPage = () => {
  const [balance, setBalance] = useState<String | undefined>()
  const [address, setAddress] = useState<String | undefined>()

  useEffect(() => {
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance("ethers.eth").then((result) => {
      setBalance(ethers.utils.formatEther(result))
    })
  })

  function connect(){
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.enable().then(() => {
      const signer = provider.getSigner()
      signer.getAddress().then((result) => {setAddress(result)})
    })
  }
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1>Sample DAPP</h1>
        <h3>Eth balance: {balance}</h3>
        <p><button onClick={connect}>Connect</button></p>
        <h3>Address: {address}</h3>
      </main>
    </div>
  )
}

export default Home
