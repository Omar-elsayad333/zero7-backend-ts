// Function to set value at a nested path
export const setNestedValue = (obj: any, path: string, value: any) => {
  const keys: any = path.split('[').map((key) => key.replace(']', ''))
  let current = obj
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!current[key]) {
      // If the current key doesn't exist, create an empty object/array
      current[key] = isNaN(keys[i + 1]) ? {} : []
    }
    if (i === keys.length - 1) {
      // If it's the last key in the path, set the value
      current[key] = value
    } else {
      // Move to the next nested object/array
      current = current[key]
    }
  }
  return current
}
