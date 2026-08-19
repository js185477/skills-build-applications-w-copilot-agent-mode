import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).then(() => setStatus('ready')).catch((reason) => { setError(reason.message); setStatus('error') })
  }, [])

  return (
    <section className="resource-view"><div className="section-heading"><p className="eyebrow">Movement log</p><h1>Activities</h1><p>Recent training sessions across the OctoFit community.</p></div>
      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="activity-grid">{activities.map((activity) => <article className="activity-card" key={activity.id ?? activity._id ?? `${activity.user}-${activity.date}`}><div className="activity-icon">{(activity.type ?? 'A').slice(0, 1)}</div><div><p className="muted">{activity.date ? new Date(activity.date).toLocaleDateString() : 'Recent'}</p><h2>{activity.type ?? 'Activity'}</h2><p>{activity.user ?? 'OctoFit member'}</p></div><div className="activity-stats"><strong>{activity.minutes ?? 0}</strong><span>min</span><strong>{activity.points ?? 0}</strong><span>pts</span></div></article>)}</div>}
    </section>
  )
}

export default Activities
