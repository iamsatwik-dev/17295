export function getUrls() {
  return JSON.parse(localStorage.getItem("urls")) || {};
}

export function saveShortUrl(shortcode, url, expiryMinutes = 30) {
  const urls = getUrls();
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + expiryMinutes * 60000);

  urls[shortcode] = {
    originalUrl: url,
    createdAt,
    expiresAt,
    clicks: [],
  };

  localStorage.setItem("urls", JSON.stringify(urls));
}

export function recordClick(shortcode) {
  const urls = getUrls();
  if (urls[shortcode]) {
    urls[shortcode].clicks.push({
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      location: "Unknown", // Fake for client-only app
    });
    localStorage.setItem("urls", JSON.stringify(urls));
  }
}
