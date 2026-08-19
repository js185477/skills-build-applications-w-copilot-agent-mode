import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users', usersEndpoint)
      .then(setUsers)
      .then(() => setStatus('ready'))
      .catch((reason) => {
        setError(reason.message)
        setStatus('error')
      })
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading"><p className="eyebrow">Community</p><h1>Users</h1><p>See who is moving the team forward this week.</p></div>
      {status === 'loading' && <p className="state-message">Loading users...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="table-wrap"><table><thead><tr><th>Name</th><th>Team</th><th>Points</th><th>Weekly minutes</th></tr></thead><tbody>{users.map((user) => <tr key={user.id ?? user._id ?? user.email}><td><strong>{user.name}</strong><span className="muted">{user.email}</span></td><td>{user.team ?? 'Unassigned'}</td><td className="number">{user.points ?? 0}</td><td className="number">{user.weeklyMinutes ?? 0}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Users
