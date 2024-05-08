import { useReducer } from 'react'

function UserForm() {
  const [state, dispatch] = useReducer((state, action) => ({
    ...state,
    ...action,
  }), {
    first: "",
    last: "",
  })

 return (
  <div>
    <div>
    <input type='text' value={state.first} onChange={e => dispatch({ first: e.target.value })} />
    </div>
    <div>
    <input type='text' value={state.last} onChange={e => dispatch({ last: e.target.value })} />
    </div>
    <div>
      First: {state.first}
    </div>
    <div>
      Last: {state.last}
    </div>
  </div>
 )
}

function NameList({ names }) {
  return (
    <ul>
      {names.map(name => <li key={name}>{name}</li>)}
    </ul>
  )
}

function App() {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "SET_NAME":
        return {
          ...state,
          name: action.payload
        }
      case "ADD_NAME":
        return {
          ...state,
          names: [...state.names, action.payload],
          name: ""
        }
    }
  }, {
    names: [],
    name: "",
  })

  return (
    <div className='App'>
      <input 
        type="text" 
        value={state.name} 
        onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })} 
      />
      <button onClick={() => dispatch({ type: "ADD_NAME", payload: state.name })}>
        Add Name
      </button>
      <NameList names={state.names} />
      <div>
        <UserForm />
      </div>
    </div>
  )
}

export default App
