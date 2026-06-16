import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST { method, url, headers, data }
router.post('/', async (req, res) => {
  const { method = 'GET', url, headers = {}, data = null, timeout = 15000 } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });

  try {
    const response = await axios({ method, url, headers, data, timeout, validateStatus: () => true });
    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: typeof response.data === 'string' ? response.data : response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
