import assert from 'node:assert/strict';
import test from 'node:test';

import { app } from './index.ts';
import { seedDatabase } from './scripts/seed.ts';

test('seedDatabase creates realistic OctoFit collections', async () => {
  const result = await seedDatabase();

  assert.ok(result.users >= 3);
  assert.ok(result.teams >= 3);
  assert.ok(result.activities >= 3);
  assert.ok(result.leaderboard >= 3);
  assert.ok(result.workouts >= 3);
});

test('API exposes the core OctoFit routes', async () => {
  const server = app.listen(0);
  const address = server.address();

  if (!address || typeof address === 'string') {
    throw new Error('Expected a TCP server address');
  }

  const port = address.port;

  try {
    const usersResponse = await fetch(`http://127.0.0.1:${port}/api/users`);
    assert.equal(usersResponse.status, 200);
    const users = await usersResponse.json();
    assert.ok(Array.isArray(users));

    const teamsResponse = await fetch(`http://127.0.0.1:${port}/api/teams`);
    assert.equal(teamsResponse.status, 200);
    const teams = await teamsResponse.json();
    assert.ok(Array.isArray(teams));

    const activitiesResponse = await fetch(`http://127.0.0.1:${port}/api/activities`);
    assert.equal(activitiesResponse.status, 200);
    const activities = await activitiesResponse.json();
    assert.ok(Array.isArray(activities));

    const leaderboardResponse = await fetch(`http://127.0.0.1:${port}/api/leaderboard`);
    assert.equal(leaderboardResponse.status, 200);
    const leaderboard = await leaderboardResponse.json();
    assert.ok(Array.isArray(leaderboard));
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});
