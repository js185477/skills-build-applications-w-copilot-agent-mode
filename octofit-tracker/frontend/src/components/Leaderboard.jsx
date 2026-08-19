import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/leaderboard/`

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard', leaderboardEndpoint).then(setEntries).then(() => setStatus('ready')).catch((reason) => { setError(reason.message); setStatus('error') })
  }, [])

  return (
    <section className="resource-view"><div className="section-heading"><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1><p>Small consistent wins add up. Here is the current score.</p></div>
      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="leaderboard-list">{entries.map((entry, index) => <div className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry.id ?? entry._id ?? entry.name}><span className="rank">{entry.rank ?? index + 1}</span><span className="leader-name">{entry.name}</span><strong>{entry.points ?? 0}<small> pts</small></strong></div>)}</div>}
    </section>
  )
}

export default Leaderboard
