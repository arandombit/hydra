export const newInstance = type => ({
  id: Math.floor(Math.random() * 1_000_000).toString(),
  title: `Untitled ${type === 'session' ? 'Session' : 'Collection'}`,
  ...(type === 'session' ? { messages: [] } : { children: [] }) 
})
