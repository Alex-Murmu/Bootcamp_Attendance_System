Live Attendance System - Frontend
This is the frontend application for the Live Attendance System, built with React, TypeScript, and Vite. It provides a real-time interface for teachers to manage classes and students to mark their attendance via WebSockets.

🚀 Purpose
The goal of this project is to provide a seamless, real-time experience for classroom attendance. By utilizing WebSockets, the system ensures that attendance data is synchronized instantly across all connected clients (teachers and students) without needing to refresh the page.

✨ Main Features
Role-Based Dashboard: Distinct interfaces for Teachers (to create/manage classes) and Students (to join and track attendance).

Real-Time WebSockets: Live updates for attendance status using the ws protocol.

Authentication: Secure Signup and Login system using JWT (JSON Web Tokens).

Class Management: Teachers can create, view, and manage class sessions.

Attendance Tracking: Automated persistence of attendance records to the MongoDB database.

Type Safety: Fully built with TypeScript to ensure robust code and developer efficiency.

🛠️ Tech Stack
Framework: React 18

Build Tool: Vite

Language: TypeScript

State Management/Communication: WebSockets (Client)

Styling: Tailwind CSS (recommended for this stack)

📥 Installation & Setup
Follow these steps to get the project running locally:

1. Clone the repository
Bash
git clone <your-repository-url>
cd <project-folder-name>
2. Install dependencies
Bash
npm install
# or
yarn install
3. Environment Configuration
Create a .env file in the root directory and add your backend and websocket URLs:

Code snippet
VITE_API_URL=http://localhost:5000/api/v1
VITE_WS_URL=ws://localhost:5000
4. Run the development server
Bash
npm run dev
The application will be available at URL=http://localhost:5173.

🏗️ Building for Production
To create an optimized production build:

Bash
npm run build
🔗 Related Resources
Backend Documentation: Notion Doc - Backend & WebSocket System