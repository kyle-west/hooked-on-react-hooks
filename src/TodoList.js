import React from 'react';

function TotoItem ({ value, id, dispatch }) {
  console.log({value, id})
  const [editMode, setEditMode] = React.useState(false)
  const [editedValue, setEditValue] = React.useState(value)

  React.useEffect(() => {
    if (!editMode && editedValue !== value) {
      // commit changes if the value changed
      dispatch({ type: 'update', id, value: editedValue })
    }
  }, [editMode, value, editedValue, dispatch, id])

  const textChange = React.useCallback((evt) => setEditValue(evt.target?.value), [])

  return (
    <li>
      {editMode? (
        <span>
          <input type="text" value={editedValue} onInput={textChange}/>
          <button onClick={() => setEditMode(false)}>Done</button>
          <button onClick={() => dispatch({ type: 'delete', id })}>Delete</button>
        </span>
      ) : (
        <span>
          {value}
          <button onClick={() => setEditMode(true)}>Edit</button>
        </span>
      )}
    </li>
  )
}

function listManager (items, action) {
  console.log('listManager', items, action)
  switch (action.type) {
    case 'create': {
      return [...items, { value: action.value, id: Date.now() }]
    }
    case 'update': {
      const { id, value } = action
      const idx = items.findIndex((entry) => id === entry.id)
      return [
        ...items.slice(0, idx),
        { value, id },
        ...items.slice(idx + 1),
      ]
    }
    case 'delete': {
      return items.filter(({id}) => id !== action.id)
    }
    default: return items
  }
}

export default function TodoList() {
  const [items, dispatch] = React.useReducer(listManager, [])
  const inputRef = React.useRef()

  const submitEntry = ({ key, target }) => {
    const { value } = target
    if (key === "Enter" && value) {
      dispatch({ type: 'create', value })
      target.value = '' // reset value
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    },0)
  }, [items])

  return (
    <div>
      <h1>Todo List</h1>
      <input ref={inputRef} placeholder='enter an item' onKeyDown={submitEntry}/>
      <ul>
        {items.map(item => <TotoItem {...item} dispatch={dispatch} key={item.id}/>)}
        {/* {items.map(item => <li key={item.id}>{item.value}</li>)} */}
      </ul>
    </div>
  )
}