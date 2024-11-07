const metadata = (method, data, options) => ({
  method,
  ...(options.credentials ? { credentials: 'include' } : {}),
  ...(data ? { body: JSON.stringify(data) } : {}),
  headers: { ...( data ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
})

const defaultOptions = { credentials: false, headers: {} }

const res = res => res.ok
  ? res.json().then(d => d).catch(() => `${res.status}: ${res.statusText}`)
  : Promise.reject(new Error(`${res.status}: ${res.statusText}`))

export default {
  get: (url, options = defaultOptions) => fetch(url, options).then(res),
  ...['delete', 'patch', 'post', 'put'].reduce((acc, method) => ({
    ...acc,
    [method]: (url, body, options = defaultOptions) => fetch(url, metadata(method, body, options))
      .then(res)
  }), {})
}
