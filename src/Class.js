
import './App.css';
import uuid from 'uuid'
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        newsApi: [],
        pageSize: '20',
        category: 'health',
        lang: 'us'
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log('submit')

        fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.lang}&category=${this.state.category}&pageSize=${this.state.pageSize}&apiKey=0f3af1e019c3497ea879537662b6de9f`)
            .then(res => res.json())
            .then(data => this.setState({ newsApi: data.articles }))

    }
    render() {
        // console.log(this.state.newsApi)
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {/* <input type="number" name="pageSize" value={this.state.pageSize} onChange={this.handleChange} />Number of posts */}


                    <select name="lang" value={this.state.lang} onChange={this.handleChange}>
                        <option value="us">us</option>
                        <option value="fr">fr</option>
                        <option value="ru">ru</option>
                    </select>
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                        <option value="health">Health</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                    <select name="pageSize" value={this.state.pageSize} onChange={this.handleChange}>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                    <button>Submit</button>

                </form>
                {this.state.newsApi.map((news) => {
                    return <div key={uuid()}>
                        <h1>{news.author ? news.author : 'Anonymous'}</h1>
                        <p>{news.content ? news.content : 'Click the link to read the full story'}</p>
                        <button>Read More</button>
                        <hr />
                    </div>
                })}
            </div>
        )
    }
}

