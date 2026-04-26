const createPaymentIntent = (req, res) => {
  const { amount } = req.body;

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'A valid amount is required' });
  }

  // Mocked PaymentIntent for local development scaffolding.
  const clientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(16).slice(2, 10)}`;

  return res.status(200).json({ clientSecret });
};

module.exports = { createPaymentIntent };
