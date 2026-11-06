// Add this line at the TOP of your existing service-worker.js:  importScripts('push-handler.js');
self.addEventListener('push', function (e) {
  var d = {}; try { d = e.data.json(); } catch (x) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'TAMINADO FX', { body: d.body || '', icon: 'icon-192.png', data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
