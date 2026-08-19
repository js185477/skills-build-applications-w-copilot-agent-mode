const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8000')

export async function fetchCollection(resource) {
  const response = await fetch(`${apiBaseUrl}/api/${resource}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  return []
}
