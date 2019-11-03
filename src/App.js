import './App.css';
import uuid from 'uuid'
import React, { useState } from 'react'


function App() {
  const [newsApi, setNewsApi] = useState([])
  const [lang, setLang] = useState("us")
  const [category, setCategory] = useState("business")
  const [pageSize, setPageSize] = useState(20)

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`https://newsapi.org/v2/top-headlines?country=${lang}&category=${category}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_MY_API_KEY}`)
      .then(res => res.json())
      .then(data => setNewsApi(data.articles))
  }

  console.log(process.env.REACT_APP_MY_API_KEY)
  return (
    <>
      <br /><br />
      <form className="container">
        <select className="u-full-width" name="lang" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="us">US</option>
          <option value="fr">FR</option>
          <option value="rs">RS</option>
        </select>
        <br />
        <select className="u-full-width" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="business">business</option>
          <option value="health">health</option>
          <option value="entertainment">entertainment</option>
        </select>
        <br />
        <select className="u-full-width" name="pageSize" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
        <br />
        <button className="u-full-width" onClick={onSubmit}>Submit</button>
      </form>
      <br /><br />
      <div className="container">
        <div className="row">
          {newsApi.map((news) => {
            return <div key={uuid()} >
              <h4>{news.author ? news.author : 'Anonymous'}</h4>
              <h5>{news.title ? news.title : 'Click the link below to read the full story'}</h5>
              <hr />
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App