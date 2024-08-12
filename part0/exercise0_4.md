```mermaid
sequenceDiagram
  browser ->> server: User writes stuff and saves
  server -->> browser: redirects the user
  browser ->> server: fetches Json data
  server -->> browser: sends updated Json data
  Note over browser: Renders the data
```
