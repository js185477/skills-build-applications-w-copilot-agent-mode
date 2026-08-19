import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).then(() => setStatus('ready')).catch((reason) => { setError(reason.message); setStatus('error') })
  }, [])

  return (
    <section className="resource-view"><div className="section-heading"><p className="eyebrow">Collective energy</p><h1>Teams</h1><p>Find your crew and keep the momentum visible.</p></div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team.id ?? team._id ?? team.name}><div className="team-mark">{(team.name ?? 'T').slice(0, 1)}</div><h2>{team.name}</h2><p className="muted">{team.members ?? 0} members</p><div className="team-score"><span>Team score</span><strong>{team.score ?? team.points ?? 0}</strong></div></article>)}</div>}
    </section>
  )
}

export default Teams
