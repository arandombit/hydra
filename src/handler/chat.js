import { deleteElement, getElement, updateElement } from '../util/array'
import { newInstance } from '../util/data'
import openai from '../util/openai'

export const handleAdd = api => () => {
  const item = newInstance(api.type)
  api.setSessions([...api.sessions, item])
  if (api.type === 'session') { api.setSelected(item.id) }
}

export const handleChange = api => async e => {
  api.setToken(e.target.value.trim())
  if (!e.target.value.trim()) {
    api.setIsValid(null)
  } else {
    const isValid = await openai.isValidToken(e.target.value)
    api.setIsValid(isValid)
  }
}

export const handleCollection = api => () => {
  const session = newInstance('session')
  const sessions = [...api.sessions]
  const collection = getElement(sessions, api.id)
  updateElement(sessions, api.id, { ...collection, children: [...collection.children, session] })
  api.setSessions(sessions)
  api.setSelectedCollection(api.id)
  api.setSelected(session.id)
}

export const handleDelete = api => () => {
  const sessions = [...api.sessions]
  deleteElement(sessions, api.id)
  api.setSessions(sessions)
}

export const handleEditSubmit = api => e => {
  e.preventDefault()
  const sessions = [...api.sessions]
  const session = getElement(sessions, api.editID)
  updateElement(sessions, session.id, { ...session, title: api.edit })
  api.setSessions(sessions)
  api.setEdit('')
  api.setEditID('')
}

export const handleSubmit = api => e => {
  e.preventDefault()
  if (!api.message) return
  const sessions = [...api.sessions]
  const session = getElement(sessions, api.selected)
  const messages = [...session.messages, { role: 'user', content: api.message }]

  updateElement(sessions, session.id, { ...session, messages })

  api.setSessions(sessions)
  api.mutation.mutate(messages)
  api.setMessage('')
}
