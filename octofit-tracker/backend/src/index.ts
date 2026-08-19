import express from 'express';
import type { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from './models.ts';

export const app: Express = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const users = [
  { id: 1, name: 'Ava', email: 'ava@octofit.com', team: 'Blue Falcons', points: 420, weeklyMinutes: 260 },
  { id: 2, name: 'Leo', email: 'leo@octofit.com', team: 'Green Hawks', points: 390, weeklyMinutes: 240 },
  { id: 3, name: 'Mia', email: 'mia@octofit.com', team: 'Blue Falcons', points: 360, weeklyMinutes: 210 }
];

const teams = [
  { id: 1, name: 'Blue Falcons', score: 1280, members: 12 },
  { id: 2, name: 'Green Hawks', score: 1195, members: 11 },
  { id: 3, name: 'Red Runners', score: 1104, members: 10 }
];

const activities = [
  { id: 1, user: 'Ava', type: 'Run', minutes: 35, points: 180, date: new Date().toISOString() },
  { id: 2, user: 'Leo', type: 'Cycling', minutes: 42, points: 200, date: new Date().toISOString() },
  { id: 3, user: 'Mia', type: 'Strength', minutes: 30, points: 150, date: new Date().toISOString() }
];

const leaderboard = [
  { rank: 1, name: 'Ava', points: 420 },
  { rank: 2, name: 'Leo', points: 390 },
  { rank: 3, name: 'Mia', points: 360 }
];

const workouts = [
  { id: 1, title: 'Morning Cardio', duration: 20, difficulty: 'Moderate', focus: 'Endurance' },
  { id: 2, title: 'Core Circuit', duration: 25, difficulty: 'High', focus: 'Strength' },
  { id: 3, title: 'Recovery Stretch', duration: 15, difficulty: 'Low', focus: 'Mobility' }
];

const sanitizeDocument = (doc: Record<string, unknown>) => {
  const { _id, __v, ...rest } = doc;
  return rest;
};

const getCollection = async (Model: mongoose.Model<any>, fallback: unknown[]) => {
  try {
    const docs = await Model.find().lean();
    if (docs.length > 0) {
      return docs.map((doc) => sanitizeDocument(doc as Record<string, unknown>));
    }
  } catch (error) {
    console.warn('Falling back to in-memory collection data:', error);
  }

  return fallback;
};

const respondWithCollection = (resourceName: string, collection: unknown[]) => async (_req: Request, res: Response) => {
  if (resourceName === 'users') {
    return res.json(await getCollection(User, collection));
  }

  if (resourceName === 'teams') {
    return res.json(await getCollection(Team, collection));
  }

  if (resourceName === 'activities') {
    return res.json(await getCollection(Activity, collection));
  }

  if (resourceName === 'leaderboard') {
    return res.json(await getCollection(LeaderboardEntry, collection));
  }

  if (resourceName === 'workouts') {
    return res.json(await getCollection(Workout, collection));
  }

  return res.json(collection);
};

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    apiBaseUrl,
    routes: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts']
  });
});

app.get('/api/users', respondWithCollection('users', users));
app.get('/api/teams', respondWithCollection('teams', teams));
app.get('/api/activities', respondWithCollection('activities', activities));
app.get('/api/leaderboard', respondWithCollection('leaderboard', leaderboard));
app.get('/api/workouts', respondWithCollection('workouts', workouts));

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

  app.listen(PORT, () => {
    console.log(`Server is running on ${apiBaseUrl}`);
  });
}
