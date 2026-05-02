// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Show a local browser notification
export const showLocalNotification = (title: string, body: string, icon = '/favicon.ico') => {
  if (Notification.permission !== 'granted') return;
  new Notification(title, { body, icon });
};
