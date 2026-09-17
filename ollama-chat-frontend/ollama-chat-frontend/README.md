# Ollama Chat Frontend

A minimal React (Vite) frontend for the Spring AI + Ollama backend
(`OllamaController` exposing `GET /api/ollama/{message}`).

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

## Configuration

Open `src/OllamaChat.jsx` and update `API_BASE_URL` if your Spring Boot
backend isn't running at `http://localhost:8080`:

```js
const API_BASE_URL = "http://localhost:8080/api/ollama";
```

## Backend requirement

Make sure the Spring Boot app is running (`mvn spring-boot:run` or your
IDE's run configuration) and that Ollama itself is running locally with
the `deepseek-r1:8b` model pulled, since `application.properties` sets:

```
spring.ai.ollama.chat.options.model=deepseek-r1:8b
```

The controller already has `@CrossOrigin("*")`, so no extra CORS
configuration is needed for local development.

## Build for production

```bash
npm run build
```

Output goes to `dist/`, which you can serve with any static file server
or copy into the Spring Boot app's `src/main/resources/static` folder.
