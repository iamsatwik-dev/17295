import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { getUrls, saveShortUrl } from "../utils/storage";
import { isValidUrl, isValidShortcode } from "../utils/validator";
import { logEvent } from "../utils/logger";

function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = () => {
    setError("");
    const urls = getUrls();

    // Validate URL
    if (!isValidUrl(url)) {
      setError("Invalid URL format.");
      logEvent("error", "Invalid URL", { url });
      return;
    }

    // Handle shortcode
    let code = shortcode || Math.random().toString(36).substring(2, 8);
    if (!isValidShortcode(code)) {
      setError("Shortcode must be 3–10 alphanumeric characters.");
      return;
    }
    if (urls[code]) {
      setError("Shortcode already exists. Try another.");
      return;
    }

    // Validity
    const expiry = validity ? parseInt(validity) : 30;
    if (isNaN(expiry) || expiry <= 0) {
      setError("Validity must be a positive number (minutes).");
      return;
    }

    // Save
    saveShortUrl(code, url, expiry);
    setShortUrl(`${window.location.origin}/?id=${code}`);
    logEvent("info", "URL shortened", { url, shortcode: code, expiry });
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        React URL Shortener
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextField
          label="Long URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ width: "400px" }}
        />
        <TextField
          label="Custom Shortcode (optional)"
          variant="outlined"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          sx={{ width: "400px" }}
        />
        <TextField
          label="Validity in Minutes (optional)"
          variant="outlined"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          sx={{ width: "400px" }}
        />

        <Button variant="contained" color="primary" onClick={handleShorten}>
          Shorten
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        {shortUrl && (
          <Alert severity="success">
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default ShortenerPage;
