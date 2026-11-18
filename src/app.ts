import express from 'express';

export const app = express();

app.use(express.json());

// (Do not modify) Health check endpoint
app.get('/health', function (_, res) {
  res.sendStatus(200);
});

// TODO: Implement the add endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <sum of a and b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/add', function (req, res) {
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: Implement the subtract endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <a minus b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/subtract', function (req, res) {
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: Implement the multiply endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <product of a and b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
app.get('/api/v1/multiply', function (req, res) {
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: Implement the divide endpoint
// - Accept two query parameters: `a` and `b`
// - Return JSON: { result: <a divided by b> }
// - If either `a` or `b` is missing or not a valid number, return 400: { error: 'Invalid operands' }
// - If `b` is 0, return 400: { error: 'Division by zero' }
app.get('/api/v1/divide', function (req, res) {
  res.status(501).json({ error: 'Not implemented' });
});
