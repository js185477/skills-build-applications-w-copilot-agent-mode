import mongoose from 'mongoose';
import { pathToFileURL } from 'node:url';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userSeedData = [
  { id: 1, name: 'Ava', email: 'ava@octofit.com', team: 'Blue Falcons', points: 420, weeklyMinutes: 260 },
  { id: 2, name: 'Leo', email: 'leo@octofit.com', team: 'Green Hawks', points: 390, weeklyMinutes: 240 },
  { id: 3, name: 'Mia', email: 'mia@octofit.com', team: 'Blue Falcons', points: 360, weeklyMinutes: 210 },
  { id: 4, name: 'Noah', email: 'noah@octofit.com', team: 'Red Runners', points: 330, weeklyMinutes: 190 }
];

const teamSeedData = [
  { id: 1, name: 'Blue Falcons', score: 1280, members: 12 },
  { id: 2, name: 'Green Hawks', score: 1195, members: 11 },
  { id: 3, name: 'Red Runners', score: 1104, members: 10 },
  { id: 4, name: 'Silver Sharks', score: 1060, members: 9 }
];

const activitySeedData = [
  { id: 1, user: 'Ava', type: 'Run', minutes: 35, points: 180, date: new Date('2026-08-15T07:00:00Z') },
  { id: 2, user: 'Leo', type: 'Cycling', minutes: 42, points: 200, date: new Date('2026-08-15T09:30:00Z') },
  { id: 3, user: 'Mia', type: 'Strength', minutes: 30, points: 150, date: new Date('2026-08-15T12:15:00Z') },
  { id: 4, user: 'Noah', type: 'Swim', minutes: 28, points: 140, date: new Date('2026-08-15T18:00:00Z') }
];

const leaderboardSeedData = [
  { rank: 1, name: 'Ava', points: 420 },
  { rank: 2, name: 'Leo', points: 390 },
  { rank: 3, name: 'Mia', points: 360 },
  { rank: 4, name: 'Noah', points: 330 }
];

const workoutSeedData = [
  { id: 1, title: 'Morning Cardio', duration: 20, difficulty: 'Moderate', focus: 'Endurance' },
  { id: 2, title: 'Core Circuit', duration: 25, difficulty: 'High', focus: 'Strength' },
  { id: 3, title: 'Recovery Stretch', duration: 15, difficulty: 'Low', focus: 'Mobility' },
  { id: 4, title: 'Hill Intervals', duration: 30, difficulty: 'High', focus: 'Speed' }
];

export async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const [users, teams, activities, leaderboard, workouts] = await Promise.all([
      User.insertMany(userSeedData),
      Team.insertMany(teamSeedData),
      Activity.insertMany(activitySeedData),
      LeaderboardEntry.insertMany(leaderboardSeedData),
      Workout.insertMany(workoutSeedData)
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();

    return {
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboard: leaderboard.length,
      workouts: workouts.length
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  seedDatabase().catch((error) => {
    console.error('Failed to seed database:', error);
    process.exit(1);
  });
}
