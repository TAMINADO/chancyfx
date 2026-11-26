// Add this line at the TOP of your existing service-worker.js:  importScripts('push-handler.js');
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data.json(); } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(String(d.title || 'TAMINADO FX').slice(0, 80), {
    body: String(d.body || '').slice(0, 240),
    icon: 'icon-192.png',
    badge: 'favicon-48.png',
    data: { url: d.url || './' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  // Only ever open pages on our own origin (a forged push cannot send users elsewhere)
  var target;
  try {
    var u = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope);
    target = u.origin === self.location.origin ? u.href : self.registration.scope;
  } catch (x) { target = self.registration.scope; }
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url === target && 'focus' in list[i]) return list[i].focus();
    }
    return clients.openWindow(target);
  }));
});
