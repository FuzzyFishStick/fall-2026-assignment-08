
import express from 'express';

export const app = express();

app.use(express.json());

// (Do not modify) Health check endpoint
app.get('/health', function (_, res) {
  res.sendStatus(200);
});

// Helper function to validate query parameters
function getOperands(a: unknown, b: unknown) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return null;
  }

  if (a.trim() === '' || b.trim() === '') {
    return null;
  }

  const numA = Number(a);
  const numB = Number(b);

  if (!Number.isFinite(numA) || !Number.isFinite(numB)) {
    return null;
  }

  return { numA, numB };
}

// Add endpoint
app.get('/api/v1/add', function (req, res) {
  const operands = getOperands(req.query.a, req.query.b);

  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }

  const { numA, numB } = operands;
  return res.status(200).json({ result: numA + numB });
});

// Subtract endpoint
app.get('/api/v1/subtract', function (req, res) {
  const operands = getOperands(req.query.a, req.query.b);

  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }

  const { numA, numB } = operands;
  return res.status(200).json({ result: numA - numB });
});

// Multiply endpoint
app.get('/api/v1/multiply', function (req, res) {
  const operands = getOperands(req.query.a, req.query.b);

  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }

  const { numA, numB } = operands;
  return res.status(200).json({ result: numA * numB });
});

// Divide endpoint
app.get('/api/v1/divide', function (req, res) {
  const operands = getOperands(req.query.a, req.query.b);

  if (!operands) {
    return res.status(400).json({ error: 'Invalid operands' });
  }

  const { numA, numB } = operands;

  if (numB === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }

  return res.status(200).json({ result: numA / numB });
});