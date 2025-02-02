// Import the necessary Cloudflare Workers libraries
import { Router } from 'itty-router';
import { handleGitHubIntegration, executeCommand } from './handlers';

// Create a new router instance
const router = Router();

// Route for GitHub integration (webhooks)
router.post('/github', async (request, env) => {
  try {
    const githubAccessToken = env.GITHUB_ACCESS_TOKEN;

    if (!githubAccessToken) {
      throw new Error("Missing GitHub Access Token in environment variables.");
    }

    return await handleGitHubIntegration(request, githubAccessToken);
  } catch (error) {
    console.error('Error processing GitHub event:', error); 
    return new Response(`Error processing GitHub event: ${error.message}`, { status: 500 });
  }
});

// Route for executing commands
router.post('/execute', async (request) => {
  try {
    const { command } = await request.json();

    // Sanitize input to prevent command injection (more robust approach)
    const sanitizedCommand = sanitizeInput(command); 

    return await executeCommand(sanitizedCommand);
  } catch (error) {
    console.error('Error executing command:', error);
    return new Response(`Error executing command: ${error.message}`, { status: 500 });
  }
});

// Route for generating music from art (using AI model)
router.post('/generate-music', async (request) => {
  try {
    const imageData = await request.json();

    if (!imageData) {
      throw new Error("Missing image data in the request.");
    }

    const music = await generateMusicFromArt(imageData);
    return new Response(music, { status: 200 });
  } catch (error) {
    console.error('Error generating music:', error);
    return new Response(`Error generating music: ${error.message}`, { status: 500 });
  }
});

// Default handler for any other requests
router.all('*', () => new Response('Endpoint not found', { status: 404 }));

// Register the fetch event listener to use the router
addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request));
});

// Simple input sanitization (replace with a more robust solution)
function sanitizeInput(input) {
  // Example: Remove special characters and limit length 
  return input.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 100); 
}
