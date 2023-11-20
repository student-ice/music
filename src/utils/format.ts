export function formatDate(timestamp: number) {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 1000 / 60).toString().padStart(2, '0')
  const seconds = Math.floor(duration / 1000 % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}