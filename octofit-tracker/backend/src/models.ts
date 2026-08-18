import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    weeklyMinutes: { type: Number, default: 0 }
  },
  { collection: 'users' }
);

const teamSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    score: { type: Number, required: true },
    members: { type: Number, default: 0 }
  },
  { collection: 'teams' }
);

const activitySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    user: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { collection: 'activities' }
);

const leaderboardEntrySchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    points: { type: Number, required: true }
  },
  { collection: 'leaderboard' }
);

const workoutSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String, required: true }
  },
  { collection: 'workouts' }
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry ?? mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
