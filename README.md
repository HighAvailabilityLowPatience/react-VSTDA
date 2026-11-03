# VSTDA — Visual Task Decision Assistant

A React and Express application that combines task, event and list management with an AI assistant. VSTDA supplies the model with current application data, conversation context, fresh date/time information and optional browser location so responses can reflect the user's situation.

## What it does

- Manage tasks, events and lists through the interface or registered agent tools.
- Track task statuses: incomplete, started, blocked and completed.
- Chat with an assistant through OpenRouter.
- Run capacity checks, task-cleanup recommendations and weekend-planning workflows.
- Dictate chat messages using browser speech recognition where supported.
- Refresh application data after agent mutations and show request errors in the interface.

## Architecture

![VSTDA architecture](docs/vstda-architecture.png)

React sends same-origin HTTP requests to Express. The backend builds model context from prompt templates, runtime context, current application state and optional conversation history. OpenRouter returns text or tool calls. Registered tool calls run through the action manager, persist application changes and return results to the model. The frontend refreshes tasks, events and lists when mutations are reported.

Chat enables action tools. Capacity-check, task-cleanup and weekend-planning routes call the model with tools disabled.

## Voice and runtime context

**Voice input:** The browser's `SpeechRecognition` or `webkitSpeechRecognition` API transcribes speech into the chat composer. The user sends the resulting message. Unsupported browsers retain typed chat.

**Location:** `navigator.geolocation.watchPosition()` updates React's `chatLocation` state with latitude, longitude, accuracy and an ISO capture timestamp. Location accompanies chat and planning requests when available. The server retains the last supplied location and treats locations older than one hour as stale. Context building continues when location is unavailable.

**Date and time:** The backend creates fresh `currentDateTime` values when building each model prompt. These include ISO timestamp, date, time and the explicit timezone `UTC`. This is request-time context, rather than a continuously running model clock or a browser-local timezone conversion.

**Speech output status:** The reviewed main-branch client implements speech-to-text. Text-to-speech playback was not found in `App.jsx` or `AgentReadout.jsx`. Add a speech-output feature description only after identifying its current implementation or merging it into this branch.

Location, current application state and conversation context are included in model requests. The current backend uses process-level location/chat state; user-specific session isolation is not demonstrated by these files.

## Stack

React 18 · Vite · Express 5 · OpenRouter · JSON-file application storage · Browser geolocation and speech recognition · Multi-stage Docker build

## Local development

Install a Node.js version compatible with the project dependencies, then:

```sh
npm ci
```

Create a local `.env` using values appropriate for your selected OpenRouter model:

```dotenv
OPENROUTER_API_KEY=replace_with_your_private_key
OPENROUTER_MODEL=replace_with_your_model_id
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1/chat/completions
OPENROUTER_TEMPERATURE=0.7
OPENROUTER_MAX_TOKENS=1024
```

Keep `.env` out of version control. The numbers above are example settings, not repository defaults.

Start the backend:

```sh
node server/index.js
```

Start the frontend in a second terminal:

```sh
npm run dev
```

The backend entry point listens on port 3000. Review `vite.config.js` for development proxy configuration. Browser microphone/location permissions and API support determine voice and location availability.

## Checks

```sh
npm run lint
npx vitest run
npm run build
```

These are project commands to run locally; this documentation update does not claim they passed.

## Container deployment

The Dockerfile builds the React bundle and runs Express, which serves the built frontend and API.

```sh
docker build -t vstda:local .
docker run --rm --env-file .env -p 3000:3000 vstda:local
```

This is a basic local run, not a complete persistent deployment. Application data lives under `server/data`; configure persistent storage before replacing containers containing data you want to retain. Document your actual volume, tunnel and network configuration alongside the deployment.

## Source map

- `src/App.jsx`: application state, API requests, browser location and speech input.
- `src/components/AgentReadout.jsx`: chat composer, conversation and structured agent output.
- `server/server.js`: application routes and static frontend serving.
- `server/buildprompt.js`: combines prompts, runtime context, application state and history.
- `server/runtimeContext.js`: UTC clock, location validation/age and seasonal context.
- `server/callOpenRouter.js`: model requests and action-tool execution.
- `server/Manager.js`: application mutation dispatch.
- `server/data`: JSON application data.

## Current boundaries and next steps

This is a personal application under active development. Document deployment access controls explicitly: the reviewed Express routes do not show authentication or per-user authorization. Current JSON storage and process-level context should be considered when planning concurrent or multi-user use.

Potential next steps include session isolation, stronger request validation, persistent deployment documentation and confirmed text-to-speech support.

## Demo

Add a screenshot and a short recording showing: user request → agent action → updated task/event/list. Use sample data and omit precise location and credentials.
