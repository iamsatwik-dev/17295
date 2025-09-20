
export function logEvent(type, message, data = {}) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const entry = {
    type,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  logs.push(entry);
  localStorage.setItem("logs", JSON.stringify(logs));
}
