import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import httpProxyRouter from './controllers/httpController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve client static files
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../public')));

// API proxy route
app.use('/api/http-proxy', httpProxyRouter);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.emit('status', { status: 'ONLINE', version: '1.0' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HACKINTOS server listening on http://localhost:${PORT}`);
});
