export const deleteElement = (array, id) => {
  for (let i = 0; i < array.length; ++i) {
    let element = array[i]
    if (element.id === id) {
      array.splice(i, 1)
      return true
    }
    if (element.children && element.children.length > 0) {
      const deleted = deleteElement(element.children, id)
      if (deleted) { return true }
    }
  }
  return false
}

export const getElement = (array, id) => {
  for (let element of array) {
    if (element.id === id) {
      return element
    }
    if (element.children && element.children.length > 0) {
      const result = getElement(element.children, id)
      if (result) { return result }
    }
  }
  return false
}

export const updateElement = (array, id, value) => {
  for (let i = 0; i < array.length; ++i) {
    let element = array[i]
    if (element.id === id) {
      array[i] = { ...element, ...value }
      return true
    }
    if (element.children && element.children.length > 0) {
      const updated = updateElement(element.children, id, value)
      if (updated) { return array }
    }
  }
  return false
}
