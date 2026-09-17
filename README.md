# Spring AI + Ollama Chat Demo

A full-stack demo application that connects a **Spring Boot** backend (using **Spring AI**) to a locally running **Ollama** model, with a **React** frontend for chatting with it in the browser.

## Tech Stack

**Backend**
- Java 21
- Spring Boot 4.1.0
- Spring AI 2.0.0 (`spring-ai-starter-model-ollama`)
- Maven

**Frontend**
- React 18
- Vite

**Model runtime**
- [Ollama](https://ollama.com/) running locally with the `deepseek-r1:8b` model

## Project Structure

```
.
├── backend/                      # Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/sourav/springAIDemo/
│       ├── SpringAiDemoApplication.java
│       └── OllamaController.java
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                     # React (Vite) application
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── OllamaChat.jsx
```

> Adjust the folder names above (`backend/`, `frontend/`) to match however you arrange the two projects in your repo.

## Prerequisites

- [Java 21+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (or use the included `mvnw` wrapper, if present)
- [Node.js 18+](https://nodejs.org/) and npm
- [Ollama](https://ollama.com/download) installed and running locally

Pull the model used by this project before starting the backend:

```bash
ollama pull deepseek-r1:8b
```

## Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Make sure Ollama is running (it usually starts automatically after installation, or run `ollama serve`).

3. Start the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   Or build and run the jar directly:

   ```bash
   mvn clean package
   java -jar target/springAIDemo-0.0.1-SNAPSHOT.jar
   ```

4. The backend starts on **http://localhost:8080** by default.

### API Endpoint

| Method | Endpoint                  | Description                                  |
|--------|----------------------------|-----------------------------------------------|
| GET    | `/api/ollama/{message}`   | Sends `message` to the Ollama model and returns its text response |

Example:

```bash
curl http://localhost:8080/api/ollama/Hello
```

### Configuration

`src/main/resources/application.properties`:

```properties
spring.application.name=springAIDemo
spring.ai.ollama.chat.options.model=deepseek-r1:8b
```

Change `spring.ai.ollama.chat.options.model` if you want to use a different locally pulled model.

## Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000** in your browser.

### Configuration

If your backend isn't running on `http://localhost:8080`, update the base URL in `src/OllamaChat.jsx`:

```js
const API_BASE_URL = "http://localhost:8080/api/ollama";
```

### Build for production

```bash
npm run build
```

Output is generated in `dist/`. You can serve it with any static file server, or copy its contents into the Spring Boot app's `src/main/resources/static` folder to serve the frontend directly from the backend.

## Running the Full Stack

1. Start Ollama (`ollama serve`, if not already running).
2. Start the backend: `cd backend && mvn spring-boot:run`
3. Start the frontend: `cd frontend && npm run dev`
4. Open the frontend in your browser and start chatting.

## Troubleshooting

- **`npm error ... Could not read package.json`**
  Make sure you're inside the folder that directly contains `package.json` (not a parent folder, and not a nested duplicate folder created during zip extraction). Run `dir` (Windows) or `ls` (macOS/Linux) to confirm `package.json` is listed before running `npm install`.

- **CORS errors in the browser console**
  The controller already includes `@CrossOrigin("*")`, so this shouldn't happen in local development. If it does, confirm the backend is actually running and reachable at the URL configured in `API_BASE_URL`.

- **Connection refused / empty responses**
  Confirm Ollama is running (`ollama list` should show `deepseek-r1:8b`) and that the Spring Boot app started without errors.

## License

Add a license of your choice (e.g. MIT) here.
