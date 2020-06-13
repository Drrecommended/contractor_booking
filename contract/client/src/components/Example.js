import React, { useEffect } from 'react';
import { useExample } from '../hooks'
import '../styles/Example.css'

export default () => {
  const { example, syncaction, asyncaction, reset, getExample } = useExample()
  useEffect(() => {
    getExample()
  })
  return (
    <div className="Example">
      <h2>{example}</h2>
      <button className="Example-button" onClick={() => asyncaction()}>asynchronous action</button>
      <button className="Example-button" onClick={() => syncaction()}>synchronous action</button>
      <button className="Example-button" onClick={() => reset()}>reset example state</button>
    </div>
  )
}