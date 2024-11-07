import { useEffect, useState } from 'react'

export default (key, initialState) => {
  const [state, setState] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(key))
    return saved ? saved : initialState
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)) })
  return [state, setState]
}
