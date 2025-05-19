import { useState } from 'react'
import './App.css'
import ArticleList from './ArticleList'
import Header from './Header'


function App() {

  return (
    <>
      <div>
        <h1>NC News</h1>
        <Header/>
        <ArticleList/>
      </div>
    </>
  )
}

export default App
