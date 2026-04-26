const {
  getCart,
  setCart,
  getQueue,
  setQueue,
  createId,
} = require('../data/mockStore');

const nowIso = () => new Date().toISOString();
const addSeconds = (seconds) => new Date(Date.now() + seconds * 1000).toISOString();

const ensureQueueState = (email) => {
  const list = getQueue(email);
  const now = Date.now();

  const updated = list.map((item) => {
    const next = { ...item };

    if (next.gate === 1 && next.lockedUntil && new Date(next.lockedUntil).getTime() <= now) {
      next.gate = 2;
      next.pros = next.pros && next.pros.length ? next.pros : [
        'You selected this item intentionally after a cooling-off period.',
        'The item appears aligned with your selected category and use case.',
        'Buying one unit may be practical if it replaces a less effective alternative.'
      ];
      next.cons = next.cons && next.cons.length ? next.cons : [
        'Impulse risk is still present when discounts create urgency.',
        'Consider whether a lower-cost option already meets your needs.',
        'Delaying 24 more hours could improve confidence in the purchase.'
      ];
    }

    return next;
  });

  setQueue(email, updated);
  return updated;
};

const moveFromCartToQueue = (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: 'userEmail is required' });
  }

  const cart = getCart(userEmail);
  if (!cart.length) {
    return res.status(200).json({ message: 'Cart is empty', moved: 0 });
  }

  const queue = getQueue(userEmail);
  const createdAt = nowIso();

  const queuedItems = cart.map((item) => ({
    _id: createId('queue'),
    productId: item.productId,
    name: item.name,
    image_url: item.image_url,
    category: item.category,
    price: item.price,
    quantity: item.quantity,
    gate: 1,
    cognitivePassed: false,
    pros: [],
    cons: [],
    sharesCount: 0,
    socialFallbackTime: null,
    createdAt,
    lockedUntil: addSeconds(30),
  }));

  setQueue(userEmail, [...queue, ...queuedItems]);
  setCart(userEmail, []);

  return res.status(200).json({ message: 'Items moved to queue', moved: queuedItems.length });
};

const getQueueByEmail = (req, res) => {
  const { email } = req.params;
  const queue = ensureQueueState(email);
  return res.status(200).json(queue);
};

const getQueueItemById = (req, res) => {
  const { id } = req.params;

  for (const emailQueue of [
    ...Array.from(require('../data/mockStore').queuesByEmail.values()),
  ]) {
    const found = emailQueue.find((item) => item._id === id);
    if (found) {
      return res.status(200).json(found);
    }
  }

  return res.status(404).json({ message: 'Queue item not found' });
};

const removeQueueItem = (req, res) => {
  const { id } = req.params;

  for (const [email, queue] of require('../data/mockStore').queuesByEmail.entries()) {
    const next = queue.filter((item) => item._id !== id);
    if (next.length !== queue.length) {
      setQueue(email, next);
      return res.status(200).json({ message: 'Removed from queue' });
    }
  }

  return res.status(404).json({ message: 'Queue item not found' });
};

const passGate2ForItem = (req, res) => {
  const { id } = req.params;

  for (const [email, queue] of require('../data/mockStore').queuesByEmail.entries()) {
    const index = queue.findIndex((item) => item._id === id);
    if (index >= 0) {
      queue[index] = {
        ...queue[index],
        cognitivePassed: true,
      };
      setQueue(email, queue);
      return res.status(200).json({ success: true });
    }
  }

  return res.status(404).json({ message: 'Queue item not found' });
};

const batchPassGate2 = (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: 'userEmail is required' });
  }

  const queue = getQueue(userEmail).map((item) => {
    if (item.gate === 2) {
      return {
        ...item,
        gate: 3,
        cognitivePassed: true,
        sharesCount: 0,
        socialFallbackTime: nowIso(),
      };
    }
    return item;
  });

  setQueue(userEmail, queue);
  return res.status(200).json({ success: true });
};

const shareQueueStep = (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: 'userEmail is required' });
  }

  const queue = getQueue(userEmail);
  const gate3 = queue.filter((item) => item.gate === 3);

  if (!gate3.length) {
    return res.status(200).json({ message: 'No gate 3 items found' });
  }

  const lockRef = gate3[0].socialFallbackTime;
  if (lockRef && new Date(lockRef).getTime() > Date.now()) {
    return res.status(200).json({
      message: 'Share cooldown active',
      sharesCount: gate3[0].sharesCount || 0,
      socialFallbackTime: lockRef,
    });
  }

  const nextShares = (gate3[0].sharesCount || 0) + 1;
  const shouldUnlock = nextShares >= 5;
  const nextLock = shouldUnlock ? null : addSeconds(60);

  const updated = queue.map((item) => {
    if (item.gate !== 3) {
      return item;
    }

    return {
      ...item,
      sharesCount: nextShares,
      socialFallbackTime: nextLock,
      gate: shouldUnlock ? 4 : 3,
    };
  });

  setQueue(userEmail, updated);

  return res.status(200).json({
    message: shouldUnlock ? 'Community gate complete' : 'Share recorded',
    sharesCount: nextShares,
    gateUnlocked: shouldUnlock,
  });
};

const justifyQueueItem = (req, res) => {
  const { id } = req.params;
  const { justification = '' } = req.body;
  const words = justification.trim().split(/\s+/).filter(Boolean);
  const score = Math.min(100, words.length * 4);
  const success = score >= 60;

  for (const [email, queue] of require('../data/mockStore').queuesByEmail.entries()) {
    const idx = queue.findIndex((item) => item._id === id);
    if (idx >= 0) {
      const current = queue[idx];
      queue[idx] = {
        ...current,
        gate: success ? 5 : 4,
        justification,
        justificationScore: score,
      };
      setQueue(email, queue);

      return res.status(200).json({
        success,
        score,
        feedback: success
          ? 'Strong reasoning. You demonstrated deliberate and responsible intent.'
          : 'Your explanation is short. Add more practical reasons before continuing.',
      });
    }
  }

  return res.status(404).json({ message: 'Queue item not found' });
};

const clearQueueByEmail = (req, res) => {
  const { email } = req.params;
  setQueue(email, []);
  return res.status(200).json({ success: true });
};

module.exports = {
  moveFromCartToQueue,
  getQueueByEmail,
  getQueueItemById,
  removeQueueItem,
  passGate2ForItem,
  batchPassGate2,
  shareQueueStep,
  justifyQueueItem,
  clearQueueByEmail,
};
