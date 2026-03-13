let presence = {};

export default function handler(req, res) {
  const { userId } = req.query;
  const now = Date.now();

  // Clear old presence (older than 45s)
  Object.keys(presence).forEach(id => {
    if (now - presence[id] > 45000) {
      delete presence[id];
    }
  });

  if (userId) {
    presence[userId] = now;
  }

  res.status(200).json({ 
    online: Object.keys(presence).length
  });
}
