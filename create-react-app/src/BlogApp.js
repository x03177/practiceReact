import React from 'react';
import './BlogApp.css';
import * as axios from 'axios';


class Post extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      post: {},
    }
  }
  componentDidMount () {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts/' + this.props.id ,
      responseType: 'stream'
    })
    .then(response => {
      this.setState({
        post: response.data,
      })
    });
  }
  render () {
    const { post } = this.state
    return (
      <div className="card border-light mb-3" >
        <div className="card-header">user Id: {post.userId}</div>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
        </div>
      </div>
    )
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      postId: null, // 取得 ID 可以做檢視該文章的功能
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      responseType: 'stream'
    })
    .then(response => {
      // console.log(response);
      this.setState({
        posts: response.data,
      })
    });
    // const axios = require('axios');
    // axios.get('https://jsonplaceholder.typicode.com/posts').than((response) => {
    //   console.log(response)
    // })
    // 參考：https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
  }
  componentDidUpdate (prevProps, prevState) {
    // console.log('did update', prevState)
  }
  handleClick () {
    this.setState({
      postId: null,
    })
  }

  render () {
    const {posts, postId} = this.state
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h2>BLOG POSTS</h2>
          {
          postId &&
          <button type="button" className="btn btn-outline-info" onClick={this.handleClick}>BACK</button>
          }
        </div>
        { 
        postId &&
        <Post id={postId} />
        }
        {
        !postId &&
        <ul className="list-group">
          {posts.map(post => {
            return (
              <li className="list-group-item" key={post.id} onClick={() => {
                this.setState({
                  postId: post.id,
                })
              }}>{post.title}</li>
            )
          })}
        </ul>
        }
      </div>
    )
  }
}

// 如果只要顯示，可以寫個 function 就好
const About = (props) => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassworｚd1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

class BlogApp extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      tab: 'home',
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }
  handleTabChange (e) {
    e.preventDefault();
    this.setState({
      tab: e.target.name
    })
  }

  render () {
    const {tab} = this.state
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Blog</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* tab === 'home' ? 'active' : '' 可用三元運算子，這樣前端輸出就不會有 false (tab === 'about') */}
              <li className={"nav-item" + (tab === 'home' ? 'active' : '')}>
                <a className="nav-link" href="#" name="home" onClick={this.handleTabChange}>Home</a>
              </li>
              <li className={"nav-item" + (tab === 'about' && 'active')}>
                <a className="nav-link" href="#" name="about" onClick={this.handleTabChange}>About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div style={{
            marginTop: '30px'
            // 可以這樣寫 CSS
          }}></div>
          {tab === 'home' && <Home />}
          {tab === 'about' && <About />}
        </div>
      </div>
    )
  }
}



export default BlogApp;
