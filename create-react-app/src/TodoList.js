import React from 'react';
import './App.css';

class Todo extends React.Component {
  constructor (props) {
    super (props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    // 因為 todo 是上層(props)傳來的，這個 Component 怎刪除？
    // 用 callback
    this.props.removeTodo(this.props.todo)
    // 這樣就可以使用 removeTodo

    // this.props.removeTodo(this.props.todo) 另外可改寫成如下
    // const {removeTodo, todo} = this.props;
    // removeTodo(todo)
  }

  render () {
    const {todo} = this.props;
    return (
      // <li>{this.props.todo.id}:{this.props.todo.text}</li> 也可以解構如下且在 return 前 const {todo} = this.props;
      <li>{todo.id}:{todo.text}<button onClick={this.handleDelete}>X</button></li>
    )
  }
}

class TodoList extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      todos: [],
      value: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.id = 0;
  }

  handleClick () {
    this.setState({
      todos: [...this.state.todos, {
        text: this.state.value,
        id: this.id++
      }],
      // 展開後新增 value
      value: ''
    })
  }
  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }
  removeTodo (todo) {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== todo.id)
    })
  }

  render () {
    return (
      <div>
        TODO：<input value={this.state.value} onChange={this.handleChange} />
        {/* input 的輸入文字會一直變化，先給空值 */}
        <button onClick={this.handleClick}>加加</button>
        <ul>
          {this.state.todos.map(todo => <Todo key={todo.id} todo={todo} removeTodo={this.removeTodo} />)}

          {/* {this.state.todos.map(todo => <li key={todo} >{todo}</li>)}
          state.todos 的陣列在 map(function(todo){return <li>{todo}</li>})
          key={todo} key 值為 React VD 在 diff 時的參考值，常為唯一值 */}
        </ul>
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

export default TodoList;
