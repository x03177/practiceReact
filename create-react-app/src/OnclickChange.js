import React from 'react';
import './App.css';

class Title extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {/* Title 傳過來 title 的 state，後用 props.title 取值 */}

        {/* <h1>{this.props.title}</h1>
        取得自訂屬性值 */}
      </div>
    )
  }
}

/* 筆記
  渲染 UI 過程（改變 -> render）
  初始 render 畫面 Title，click 後改變 state 的值，重新執行 render 後再取 Title 的新值
*/

class OnclickChange extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      title: '安安'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      title: Math.random()
    })
    // 不可直接這樣子 setState，須先在 constructor 綁定 this.handleClick = this.handleClick.bind(this)
    // this 在點擊下去決定 this 是誰，要再熟悉
  }

  render () {
    return (
      <div>
        <Title title={this.state.title} />

        {/* <Title title='sunny' />
        title='sunny' 可自訂屬性 title、值為 sunny */}
        {/* <button onClick={ ()=> {
          this.setState({
            title: Math.random()
          })
        }}>click me</button> */}


        <button onClick={this.handleClick}>點我</button>
      </div>
    )
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default OnclickChange;
