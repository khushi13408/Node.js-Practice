import { readFile } from "fs/promises";
import { createServer } from "http";
import { URL } from "url";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`; // Base for shortened URLs
const urlStore = new Map(); // In-memory store for URL mappings

// Validate URL format
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Create HTTP server
const server = createServer(async (req, res) => {
    const { method, url } = req;

    // Serve index.html
    if (method === "GET" && url === "/") {
        try {
            const data = await readFile("./index.html");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
        }
        return;
    }

    // Serve styles.css
    if (method === "GET" && url === "/styles.css") {
        try {
            const data = await readFile("./styles.css");
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
        }
        return;
    }

    // Handle URL shortening (POST /shorten)
    if (method === "POST" && url === "/shorten") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const { url, shortCode } = JSON.parse(body);

                // Validate inputs
                if (!url || !shortCode) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("URL and short code are required");
                    return;
                }

                if (!isValidUrl(url)) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("Invalid URL format");
                    return;
                }

                if (urlStore.has(shortCode)) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("Short code already in use");
                    return;
                }

                // Store URL mapping
                urlStore.set(shortCode, url);

                // Respond with shortened URL
                const shortenedUrl = `${BASE_URL}/${shortCode}`;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ originalUrl: url, shortCode, shortenedUrl }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Invalid request body");
            }
        });
        return;
    }

    // Handle redirection for short URLs (GET /<shortCode>)
    if (method === "GET" && url.startsWith("/")) {
        const shortCode = url.slice(1); // Remove leading "/"
        const originalUrl = urlStore.get(shortCode);

        if (originalUrl) {
            res.writeHead(302, { Location: originalUrl });
            res.end();
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Short URL not found");
        }
        return;
    }

    // Handle unknown routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));