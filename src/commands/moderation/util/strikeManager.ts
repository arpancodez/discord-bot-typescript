// Simple in-memory strike manager
// For persistence, replace with DB or JSON storage.

interface Strike {
  moderator: string;
  reason: string;
  timestamp: number;
}

const strikes: Map<string, Strike[]> = new Map();

export function addStrike(userId: string, moderator: string, reason: string): Strike[] {
  const userStrikes = strikes.get(userId) || [];
  const newStrike: Strike = { moderator, reason, timestamp: Date.now() };
  userStrikes.push(newStrike);
  strikes.set(userId, userStrikes);
  return userStrikes;
}

export function getStrikes(userId: string): Strike[] {
  return strikes.get(userId) || [];
}

export function clearStrikes(userId: string): void {
  strikes.delete(userId);
}
