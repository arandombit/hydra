import OpenAI from 'openai'

import request from './request.js'

const url = 'https://api.openai.com/v1/chat/completions'

const systemPrompt = 'You are ChatGPT, a large language model trained by OpenAI.'

const body = (model, messages) => ({ model, messages, temperature: 0.7 })
const authorization = token => ({ Authorization: `Bearer ${token}` })

export default {
  isValidToken: async token => {
    if (!token) return
    try {
      const client = new OpenAI({ apiKey: token, dangerouslyAllowBrowser: true })
      const data = await client.models.list()
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },
  query: (token, messages) => !token ? alert('No API key added') : request.post(url, body('gpt-4o', [{ role: 'system', content: systemPrompt }, ...messages]), authorization(token))
    .then(data => {
      const { choices = [] } = data
      const [{ message = '' }] = choices
      return { message }
    })
    .catch(() => alert('Request broken'))
}
