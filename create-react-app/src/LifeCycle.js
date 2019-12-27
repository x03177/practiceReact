import React from 'react';
import './App.css';

// SHOW 時開始計時，當按下 HIDE 會出錯
// 按下 HIDE 時即把 Component 移除，但是 setInterval 依舊在執行，當執行到 +1 時 Timer 已經是不在畫面上的 unmounted 狀態，所以 setInterval 欲執行卻沒有對象執行而報錯。
// 

class Timer extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      count: 0,
    }
  }
  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count +1,
      })
    }, 1000)
    // setInterval() 指定時間週期，多久會調用一次函式。1000 毫秒 = 1 秒
  }
  componentWillUnmount () {
    clearInterval(this.timer)
    // componentWillUnmount 可以避免 memory leak(記憶體流失)
  }

  render () {
    return <h2>{this.state.count}</h2>
  }
}


class LifeCycle extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      isShowTimer: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState({
      isShowTimer: !this.state.isShowTimer,
    })
  }
  render () {
    const {isShowTimer} = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>{ isShowTimer ? 'HIDE' : 'SHOW' }</button>
        {/* { isShowTimer ? <h2>TIMER</h2> : null }
        這邊可簡化如下 */}
        { isShowTimer && <Timer /> }
      </div>
    )
  }
}



export default LifeCycle;
