import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts', workoutsEndpoint).then(setWorkouts).then(() => setStatus('ready')).catch((reason) => { setError(reason.message); setStatus('error') })
  }, [])

  return (
    <section className="resource-view"><div className="section-heading"><p className="eyebrow">Training library</p><h1>Workouts</h1><p>Choose a session that fits the energy you have today.</p></div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout.id ?? workout._id ?? workout.title}><div className="workout-top"><span className="tag">{workout.difficulty ?? 'Any level'}</span><span className="muted">{workout.duration ?? 0} min</span></div><h2>{workout.title}</h2><p className="muted">Focus: {workout.focus ?? 'Full body'}</p></article>)}</div>}
    </section>
  )
}

export default Workouts
