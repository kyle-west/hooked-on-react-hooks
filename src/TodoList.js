import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
// import { useCallback, useEffect, useReducer, useRef, useState } from './freact';

function TotoItem ({ value, id, dispatch }) {
  const [editMode, setEditMode] = useState(false)
  const [editedValue, setEditValue] = useState(value)
  const inputRef = useRef(null)
  
  useEffect(() => {
    if (editMode) {

      // autofocus field when editing
      setTimeout(() => inputRef.current?.focus(), 0)

    } else if (editedValue !== value) {

      // commit changes if the value changed
      dispatch({ type: 'update', id, value: editedValue })

    }
  }, [editMode, value, editedValue, dispatch, id])

  const textChange = useCallback((evt) => setEditValue(evt.target?.value), [])

  return (
    <li>
      {editMode? (
        <>
          <input ref={inputRef} type="text" value={editedValue} onChange={textChange}/>
          <button onClick={() => setEditMode(false)}>Done</button>
          <button onClick={() => dispatch({ type: 'delete', id })}>Delete</button>
        </>
      ) : (
        <>
          {value}
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </li>
  )
}

function listReducer (items, action) {
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
  const [items, dispatch] = useReducer(listReducer, [])

  const submitEntry = ({ key, target }) => {
    const { value } = target
    if (key === "Enter" && value) {
      dispatch({ type: 'create', value })
      target.value = '' // reset value
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <input placeholder='enter an item' onKeyDown={submitEntry} className="special"/>
      <ul>
        {items.map(item => <TotoItem {...item} dispatch={dispatch} key={item.id}/>)}
      </ul>
    </>
  )
}