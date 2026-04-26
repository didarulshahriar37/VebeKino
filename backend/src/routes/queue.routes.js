const express = require('express');
const {
  moveFromCartToQueue,
  getQueueByEmail,
  getQueueItemById,
  removeQueueItem,
  passGate2ForItem,
  batchPassGate2,
  shareQueueStep,
  justifyQueueItem,
  clearQueueByEmail,
} = require('../controllers/queue.controller');

const router = express.Router();

router.post('/move-from-cart', moveFromCartToQueue);
router.get('/item/:id', getQueueItemById);
router.get('/:email', getQueueByEmail);
router.delete('/:id', removeQueueItem);
router.put('/:id/pass-gate-2', passGate2ForItem);
router.put('/batch-pass-gate-2', batchPassGate2);
router.put('/share', shareQueueStep);
router.post('/:id/justify', justifyQueueItem);
router.delete('/clear/:email', clearQueueByEmail);

module.exports = router;
