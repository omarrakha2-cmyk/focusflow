let presence = {};
let totalVisits = 0;
let seenUsers = new Set();

export default function handler(req, res) {
  const { userId } = req.query;
  const now = Date.now();

  // Clear old presence (older than 30s)
  Object.keys(presence).forEach(id => {
    if (now - presence[id] > 30000) {
      delete presence[id];
    }
  });

  if (userId) {
    presence[userId] = now;
    if (!seenUsers.has(userId)) {
      seenUsers.add(userId);
      totalVisits++;
    }
  }

  res.status(200).json({ 
    online: Object.keys(presence).length,
    totalVisits: totalVisits
  });
}
