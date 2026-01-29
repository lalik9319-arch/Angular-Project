# Task Manager - מערכת ניהול משימות

פרויקט Angular לניהול משימות, פרוייקט לימודי/דוגמה שמכיל רכיבים לניהול פרויקטים, צוותים, ומשימות.
# Task Manager

Task Manager is an Angular example/learning project for managing projects, teams and tasks. It demonstrates common patterns for a small CRUD app: authentication, component-based UI, services for API communication, models, route guards, and HTTP interceptors.

## Quick Start

Prerequisites:
- Node.js (modern LTS recommended)
- npm (comes with Node.js)

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm start
```

By default the app typically runs at `http://localhost:4200` (check project config).

Run unit tests (if configured):

```bash
npm test
```

Create a production build (if available):

```bash
npm run build
```

## Purpose and Responsibilities

This project serves as a minimal task-management application and a learning reference. Main responsibilities of the codebase:
- Provide user authentication (login/register) and session handling.
- Allow creating, viewing, editing and deleting projects, teams and tasks.
- Display task details and comments; support assigning tasks to users and teams.
- Demonstrate Angular patterns: components, services, models, guards, and interceptors.

## Screens / Components and Roles

- `Login` / `Register` (auth components): handle user authentication and account creation. They validate input and interact with the `auth` service.
- `Header` / `Footer`: global navigation and site chrome (links, user menu, logout).
- `Projects List` (`projects-list`): shows existing projects, with links to project details and project-level actions (edit/delete).
- `Add Project` (`add-project`): form to create a new project.
- `Teams List` (`teams-list`): displays teams, members and team actions.
- `Add Team` (`add-team`) / `Add Member` (`add-member`): forms to create teams and add users to teams.
- `Tasks List` (`tasks-list`): main task listing screen with filtering, sorting, and assignment controls.
- `Task Item` (`task-item`): a single task row/card with quick actions (toggle complete, edit, assign).
- `Task Form` (`task-form`): create or edit a task, set title, description, due date, priority, assignee, and related project/team.
- `Tasks All Details` (`tasks-all-details`): full view of a task including metadata, history and comments.
- `Comments List` (`comments-list`): display and post comments on tasks.

Each component delegates business logic to services (e.g., `tasks.ts`, `projects.ts`, `teams.ts`, `auth.ts`) and uses models from `src/app/models` for typing.

## Services & API

- `auth` service: login, register, token management.
- `tasks` service: CRUD operations for tasks, filtering and assignment.
- `projects` and `teams` services: manage projects and teams respectively.
- `comments` service: post and retrieve comments for tasks.

The frontend expects a REST API backend (not included). Typical environment variables:
- `API_BASE_URL` — base URL for backend API.

## Project Structure (summary)
- `src/app` — application source
  - `components/` — UI components (organized by feature)
  - `services/` — API and business logic services
  - `models/` — TypeScript models/interfaces
  - `guards/`, `interceptors/` — auth guards and HTTP interceptors
- `environments/` — configuration per environment

## Contributing

- Open an issue to discuss major changes.
- Send a pull request with clear description and tests when appropriate.

## License

MIT

---
If you want, I can also:
- Add a separate `README.EN.md` instead of replacing this file.
- Include example `environment` settings and `.env` documentation.
- Add API contract examples (endpoints and payloads).

Tell me which additions you prefer.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
