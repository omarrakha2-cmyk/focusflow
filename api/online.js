
let presence = {};
let globalTasks = 12453; // High base number for "vibe"

export default function handler(req, res) {
  const { userId, taskAdded } = req.query;
  const now = Date.now();

  // Clear old presence (older than 30s)
  Object.keys(presence).forEach(id => {
    if (now - presence[id] > 30000) {
      delete presence[id];
    }
  });

  if (userId) {
    presence[userId] = now;
  }

  if (taskAdded === 'true') {
    globalTasks++;
  }

  res.status(200).json({ 
    online: Object.keys(presence).length,
    globalTasks
  });
}
