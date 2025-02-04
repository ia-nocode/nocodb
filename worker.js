addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function encrypt(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  return btoa(String.fromCharCode(...new Uint8Array(data)))
}

async function handleRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'no-store, no-cache'
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  try {
    const timestamp = Date.now()
    const encrypted = await encrypt(`${API_KEY}_${timestamp}`)
    
    return new Response(JSON.stringify({
      token: encrypted,
      expires: timestamp + 300000 // 5 minutes
    }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Internal error'
    }), {
      status: 500,
      headers
    })
  }
}
