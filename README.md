# 🖥️ HACKINTOS

> A lightweight cyber-terminal browser and developer toolkit built with Node.js, Express, and vanilla JavaScript.

HACKINTOS combines an HTML viewer, HTTPS client, network inspector, console, and terminal into a single modern web application designed for developers, students, and web researchers.

---

## ✨ Features

- 🌐 HTML Viewer
- 🔒 HTTPS Client
- 📡 Network Inspector
- 📄 Request & Response Viewer
- 🍪 Cookie & Storage Inspector
- 💻 Integrated Terminal
- 🧩 Plugin-ready Architecture
- ⚡ Lightweight & Fast
- 🎨 Cyberpunk-inspired Interface

---

## 🏗️ Tech Stack

| Layer | Technology |
|------------|----------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| HTTP | Axios |
| Realtime | Socket.IO |
| Terminal | xterm.js |
| Future Editor | Monaco Editor |

---

## 📁 Project Structure


HACKINTOS/
│
├── client/
├── server/
├── public/
├── scripts/
├── dist/
└── README.md


---

## 🚀 Getting Started

### Requirements

- Node.js 18+
- npm

### Installation

```bash
git clone <repo>

cd HACKINTOS

npm install

npm run dev

Open:


http://localhost:3000

⚙️ Configuration

Create a .env file:

PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret
PROXY_TIMEOUT=10000
ALLOW_SELF_SIGNED=false
🌍 HTTP Proxy

HACKINTOS uses a backend proxy to avoid browser CORS limitations.

Example payload:

{
    "method":"GET",
    "url":"https://example.com",
    "headers":{},
    "data":null
}
📦 Build
npm run dist
cd dist
npm install --production
npm start
🖥️ Desktop Distribution

Supported options:

📦 pkg
📦 nexe
🖥️ Electron

Example:

npx pkg . --targets node18-win-x64 --output dist/hackintos.exe
🔌 Plugin System

Create extensions by adding:

Frontend

client/components/

Backend

server/routes/
server/controllers/

without modifying the core architecture.

📡 API
Endpoint	Description
GET /	Main UI
POST /api/http-proxy	Execute HTTP request
🧪 Development Workflow
Fork
Create a feature branch
Commit changes
Open a Pull Request
🔐 Security

HACKINTOS can send arbitrary HTTP requests.

Recommended:

✅ Run locally
✅ Validate URLs
✅ Enable rate limiting
✅ Never expose publicly without authentication
🛣️ Roadmap
 Monaco Editor
 Plugin Marketplace
 Authentication
 Desktop Application
 Multi-tab Support
 Theme Manager
🤝 Contributing

Contributions are welcome!

Feel free to submit improvements, bug fixes, or new features via Pull Requests.

📜 License

MIT License

See LICENSE for details.
