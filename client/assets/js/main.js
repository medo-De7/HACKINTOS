const socket = (window.io) ? io() : null;
if (socket) socket.on('status', s => console.log('server status', s));

document.addEventListener('DOMContentLoaded', () => {
  const goBtn = document.getElementById('goBtn');
  const address = document.getElementById('address');
  const viewer = document.getElementById('viewerFrame');

  goBtn.addEventListener('click', async () => {
    const url = address.value.trim();
    if (!url) return;
    const resp = await window.httpClient.proxyRequest({ method: 'GET', url });
    if (resp && resp.data) {
      try {
        viewer.srcdoc = resp.data;
      } catch (e) {
        viewer.srcdoc = `<pre>${escapeHtml(resp.data)}</pre>`;
      }
      const panel = document.querySelector('[data-panel="response"]');
      if (panel) panel.textContent = (typeof resp.data === 'string') ? resp.data : JSON.stringify(resp.data, null, 2);
    }
  });

  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
      const panel = document.querySelector(`[data-panel="${tab}"]`);
      if (panel) panel.classList.remove('hidden');
    });
  });
});

function escapeHtml(s) { return String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }
