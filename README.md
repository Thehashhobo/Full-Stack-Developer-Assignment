# 🚚 Full-Stack Developer Assignment – Shipment Tracker

This is a full-stack shipment tracking application built with:

- **Frontend**: Next.js + React + Material UI
- **Backend**: ASP.NET Core Web API (Clean Architecture with DDD) + Entity Framework Core

---

## 📦 Features

- Shipment dashboard with filtering and pagination
- Add new shipment form
- Edit/update shipment status via modal
- RESTful API testing with Swagger
- logger with Serilog
- SQLite demo database included

---

## 🛠️ Prerequisites

### Frontend
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

### Backend
- [.NET SDK 9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- (Optional) EF Core CLI tools:
  ```bash
  dotnet tool install --global dotnet-ef

## Frontend Setup
```
git clone https://github.com/Thehashhobo/Full-Stack-Developer-Assignment.git
cd ./frontend/
npm install
npm run dev
```
Dev server hosted at http://localhost:3000 

(backend only allows connection from http://localhost:3000)

## Backend Setup
```
cd ./backend/HW.API/
dotnet run
```
API will be available at: http://localhost:5154

Swagger UI: http://localhost:5154/swagger

### Database Setup 
💡 Ideally, generate the database using migrations.
A pre-seeded SQLite file shipment_tracker.db is included for demo purposes.
```
dotnet ef migrations add InitialCreate --project ../HW.Infrastructure
dotnet ef database update --project ../HW.Infrastructure
```

### 📥 Manually Populate Database
```
cd ./HW.Infrastructure/
sqlite3 shipment_tracker.db

-- Insert demo carriers
INSERT INTO Carriers (Name) VALUES
('FedEx'), ('Canada Post'), ('UPS'), ('DHL');

-- Insert demo shipments
INSERT INTO Shipments (Origin, Destination, CarrierId, ShipDate, ETA, Status) VALUES
('Toronto', 'Vancouver', 1, '2025-05-01z', '2025-05-05', 'In Transit'),
('Calgary', 'Montreal', 2, '2025-05-02', '2025-05-06', 'Pending'),
('Calgary', 'Toronto', 3, '2025-05-04', '2025-05-06', 'In Transit'),
('Montreal', 'New York', 4, '2025-05-01', '2025-05-02', 'Delivered');
```
## 🚀 Deployment Overview

For demonstration purposes, deployment was kept simple and focused on local development, but I’ve outlined how deployment would be approached in a production setting.

### Frontend
The frontend, built with Next.js, is straightforward to deploy using platforms like **Vercel** or **Netlify**, which support static and server-side rendered React apps with zero-config deployment. For quick previews, **GitHub Pages (`gh-pages`)** could be used, but it requires static export and lacks support for dynamic features like data fetching with SWR. For a real-world deployment, **Vercel** is preferred due to its seamless integration and better support for full-stack apps.

### Backend
The backend is container-ready and could be deployed to platforms like **AWS ECS with Fargate**, **Azure App Service for Containers**, or **Dockerized VPS setups**. I have prior experience deploying containerized services using:

- **AWS Elastic Container Registry (ECR)** for image storage
- **AWS ECS (Fargate)** for container orchestration
- **Application Load Balancer (ALB)** for routing
- **AWS Certificate Manager (ACM)** for setting up **SSL/TLS** and HTTPS endpoints

While I'm confident with the infrastructure and containerization process, deploying **ASP.NET Core backend code** at a production-grade level is new territory. I expect it would take a bit more time to fully familiarize myself with .NET-specific build, hosting, and configuration best practices (e.g., environment-based appsettings, logging providers, Kestrel tuning). That said, the fundamentals of container deployment, infrastructure-as-code, and CI/CD pipelines are already in my skill set.


## 🧠 Design Choices & Future Improvements

### 🎨 Frontend

- **TypeScript**: Used for strong type safety and better integration with structured backend data.
- **Carrier Context**: Reduced redundant API calls and simplified ID-to-name mapping after initially over-coupling to numeric Carrier IDs.
- **Shipments Not in Context**: Kept shipments local to components since global usage was minimal.
- **Centralized API Access**: API logic centralized in `api.ts` for maintainability.
- **React Hook Form**: Lightweight and effective for managing forms; easy to extend with validation.
- **Responsive Design**: Optimized for desktop. Mobile support exists but was not prioritized due to scope.
- **Styling**: Functional but minimal. Needs improvement with better theming, feedback states, and modern design.
- **Performance**: UI feels sluggish with larger datasets. Could benefit from virtualization (`react-window`) and memoization.
- **Global State**: Introducing tools like Zustand or Redux Toolkit would improve state sharing as app complexity grows.
- **Validation**: Should add client-side schema validation (e.g., using `Zod` or `Yup`) to improve form robustness.

---

### 🛠️ Backend

- **Controller-Based API**: Chosen over minimal API for clearer structure, better testability, and easier onboarding as a first-time C# user.
- **SQLite**: Used for easier inspection and state persistence during development.
- **Status Field**: Ideally should be a foreign key for data integrity but kept simple for this challenge.
- **Async EF Calls**: Used `async`/`await` to prevent blocking and improve scalability.
- **DTOs Without Validation**: DTOs help structure data but should be extended with validation (e.g., `[Required]`, FluentValidation).
- **Clean Architecture + DDD**: Applied a layered architecture with clear separation of concerns:
  - `API` layer handles HTTP requests and responses.
  - `Application` layer contains use cases and interfaces, driving the flow of data without depending on infrastructure.
  - `Domain` layer defines core business models and logic, entirely isolated from technical concerns.
  - `Infrastructure` layer implements interfaces for data persistence and external services.
  Dependencies flow inward (Infrastructure → Application → Domain), ensuring **one-way dependency rules**. Interfaces are defined in the Application layer and implemented in Infrastructure, enabling **loose coupling** and **dependency injection** for flexibility and testability
- **Serilog**: Integrated for structured logging to console and file; scalable for production use.
- **Performance**: Can be improved with DB indexing, caching, and more efficient pagination.
- **Auth & Access Control**: Add JWT or cookie-based authentication for user-specific access in real-world use.
- **Testing**: Needs unit and integration testing (xUnit/NUnit) with SQLite or in-memory DB.

---

### 🧩 Learning Note

This project was my first experience working with C# and ASP.NET Core. I approached it as an opportunity to step outside of my comfort zone and gain hands-on experience with a mature, enterprise-grade framework. Throughout the process, I was able to quickly ramp up by reviewing clean architecture principles, exploring the .NET ecosystem, and applying concepts such as dependency injection, RESTful API design, and EF Core migrations. I enjoyed the challenge and look forward to deepening my understanding of .NET development in more complex, production-level scenarios.
