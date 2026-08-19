import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { apiBaseUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <img src={logo} alt="OctoFit" />
          <span>OctoFit <small>TRACKER</small></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <span className="status-dot">API connected</span>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
      <footer><span>OCTOFIT / MOVE WITH INTENT</span><span>{apiBaseUrl}</span></footer>
    </div>
  )
}

function Overview() {
  return <section className="overview">
    <div className="overview-copy"><p className="eyebrow">Your movement, in one place</p><h1>Make today<br /><em>count.</em></h1><p className="intro">Track the work, find your people, and turn steady effort into visible progress.</p><NavLink className="primary-action" to="/activities">View recent activity <span>{'->'}</span></NavLink></div>
    <div className="overview-panel"><span className="panel-label">Explore the tracker</span><div className="overview-links"><NavLink to="/leaderboard"><strong>01</strong><span>See the leaderboard</span><b>{'->'}</b></NavLink><NavLink to="/workouts"><strong>02</strong><span>Find a workout</span><b>{'->'}</b></NavLink><NavLink to="/teams"><strong>03</strong><span>Meet your team</span><b>{'->'}</b></NavLink></div></div>
  </section>
}

export default App
