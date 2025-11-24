
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Configuration
 */
const CONFIG = {
    // The secret key you want to use to protect your API
    // You should change this to something random and secure!
    API_KEY: "my_secret_key_12345",

    // The raw GitHub URL you want to protect
    TARGET_URL: "https://raw.githubusercontent.com/albinchristo04/ptv/refs/heads/main/events_with_m3u8.json",

    // CORS settings (allows your website to access this worker)
    CORS_ORIGIN: "*"
}

async function handleRequest(request) {
    const url = new URL(request.url)

    // 1. Check for the API key in the query parameters (e.g., ?key=...)
    const key = url.searchParams.get('key')

    if (!key || key !== CONFIG.API_KEY) {
        return new Response(JSON.stringify({ error: "Unauthorized. Invalid or missing API key." }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": CONFIG.CORS_ORIGIN
            }
        })
    }

    // 2. Fetch the data from the hidden GitHub URL
    try {
        const response = await fetch(CONFIG.TARGET_URL)

        if (!response.ok) {
            throw new Error(`GitHub responded with ${response.status}`)
        }

        const data = await response.text()

        // 3. Return the data to the user with correct headers
        return new Response(data, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": CONFIG.CORS_ORIGIN, // Allow your site to read this
                "Cache-Control": "max-age=60" // Cache for 1 minute to reduce GitHub load
            }
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data from source." }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": CONFIG.CORS_ORIGIN
            }
        })
    }
}
