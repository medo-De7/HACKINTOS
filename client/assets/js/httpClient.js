async function proxyRequest(opts) {
  const res = await fetch('/api/http-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  });
  return res.json();
}

window.httpClient = { proxyRequest };
