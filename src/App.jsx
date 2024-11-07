import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {  Button, Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { CardStackPlusIcon,  PlusIcon } from '@radix-ui/react-icons'

import './App.css'

import { handleAdd, handleCollection, handleDelete, handleEditSubmit, handleSubmit } from './handler/chat'

import request from './util/request'
import { getElement, updateElement } from './util/array'

import useLocalStorage from './hook/useLocalStorage'

import ChatWindow from './component/ChatWindow'
import Collection from './component/Collection'
import Session from './component/Session'

const App = () => {
  const [message, setMessage] = useState('')
  const [edit, setEdit] = useState('')
  const [editID, setEditID] = useState('')
  const [sessions, setSessions] = useLocalStorage('sessions', [])
  const [selected, setSelected] = useLocalStorage('selected', '')
  const [selectedCollection, setSelectedCollection] = useLocalStorage('selectedCollection', '')
  const session = getElement(sessions, selected)
  const mutation = useMutation({
    mutationFn: messages => request.post('http://localhost:8000/', { messages }),
    onSuccess: data => {
      const state = [...sessions]
      const session = getElement(state, selected)
      const messages = [...session.messages, data.message]
      updateElement(state, selected, { messages })
      setSessions(state)
    }
  })
  return (
    <Flex direction='column' px='1%' py='1%' height='95vh' width='100%'>
      <Flex width='100%' justify='end'>
        <Grid columns='2' mb='2' width='20%'>
          <Button variant='outline' mr='1' onClick={handleAdd({ sessions, setSelected, setSessions, type: 'session' })}><PlusIcon /></Button>
          <Button variant='outline' ml='1' onClick={handleAdd({ sessions, setSessions, type: 'collection' })}><CardStackPlusIcon /></Button>
        </Grid>
      </Flex>
      <Flex height='100%' width='100%'>
        <Flex direction='column' height='100%' width='20%'>
          <ScrollArea orientation='vertical'>
            { sessions.map(s =>
              !s.children
                ? <Session key={s.id}
                    {...s}
                    selected={selected === s.id}
                    isEditing={editID === s.id}
                    onClick={() => setSelected(s.id)}
                    onSubmit={handleEditSubmit({ edit, editID, sessions, setEdit, setEditID, setSessions })}
                    onEdit={() => setEditID(editID !== s.id ? s.id : '')}
                    onDelete={handleDelete({ id: s.id, sessions, setSessions })}
                  />
                : <Collection key={s.id}
                    {...s}
                    isSelected={selectedCollection === s.id}
                    isEditing={editID === s.id}
                    isOpen={selectedCollection === s.id}
                    onSubmit={handleEditSubmit({ edit, editID, sessions, setEdit, setEditID, setSessions })}
                    onChange={e => setEdit(e.target.value)}
                    value={edit}
                    onSelect={() => setSelectedCollection(selectedCollection === s.id ? '' : s.id)}
                    onNewSession={handleCollection({ id: s.id, sessions, setSelected, setSelectedCollection, setSessions })}
                    onDelete={handleDelete({ id: s.id, sessions, setSessions })}
                  >
                    { s.children.map(x =>
                      <Session key={x.id}
                        {...x}
                        selected={selected === x.id}
                        isEditing={editID === x.id}
                        onClick={() => setSelected(x.id)}
                        onSubmit={handleEditSubmit({ edit, editID, sessions, setEdit, setEditID, setSessions })}
                        onEdit={() => setEditID(editID !== x.id ? x.id : '')}
                        onDelete={handleDelete({ id: x.id, sessions, setSessions })}
                      />
                    ) }
                  </Collection>
            ) }
          </ScrollArea>
        </Flex>
        <ChatWindow
          session={session}
          onSubmit={handleSubmit({ message, mutation, selected, sessions, setMessage, setSessions })}
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
      </Flex>
    </Flex>
  )
}

export default App
