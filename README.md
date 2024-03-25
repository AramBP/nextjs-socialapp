This is a simple social media made with Nextjs for the frontend.
And Pocketbase for the backend.

Todo:

- Authorization

  - [x] Add OAuth functionality
  - [x] Add email/pass auth
  - [x] Add signup with email/password
  - [x] Add logout functionality
  - [x] Add confirm email functionality
  - [ ] Improve authorzation, right now its just a cookie that stores "isLoggedIn" as a boolean
  - [ ] Add password reset functionaluty
  - [ ] Stylize login/signup pages with shadcn-ui

- Optimaization/General
  - [ ] Move urls into .env.local
  - [ ] Remove database interaction from db/index.js, migrate to using react hooks for this logic
