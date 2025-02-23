const fetchImages = async () => {
  const response = await fetch('/api/images')
  const data = await response.json()

  return data
}

export { fetchImages }