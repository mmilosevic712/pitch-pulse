# Pitch Pulse ⚽️

**Pitch Pulse** is a real-time football news aggregator that brings the latest "Hot Topics" from the world of soccer into one clean, responsive interface. 

## 🚀 Live Demo
[https://pitchpulse.lovable.app]

---

## 🛠 How It’s Built
This project was developed as a passion project using Lovable, an AI-assisted development platform, allowing for a rapid transition from concept to a functional full-stack application.

* **Frontend:** Built with **React** and **Tailwind CSS** for a modern, mobile-first user experience.
* **Data Source:** Real-time news is integrated via the **NewsData.io API**, fetching the latest sports headlines, images, and transfer rumors.
* **Backend:** Powered by **Supabase**, utilizing **Edge Functions** to handle data requests and external API communication.

---

## 🔐 Technical Features & Security
A key focus of this project was implementing professional standards for security and resource management:

* **Server-Side Secret Management:** All API calls to NewsData.io are handled through server-side Edge Functions. This ensures that sensitive API keys are stored as environment variables and are never exposed to the client-side or the browser's network tab.
* **CORS Security:** Restricted the backend to only accept requests from the application's specific domain, preventing unauthorized third-party access.
* **Secure Configuration:** Verified that all sensitive credentials remain outside of the version control system, following industry best practices for public GitHub repositories.

---

## 📂 Project Structure
* `/src`: The React frontend components and UI design.
* `/supabase/functions/football-news`: The serverless backend logic responsible for the secure news fetch and API orchestration.

---
*Developed as a passion project exploring the intersection of sports media and modern web development tools.*


