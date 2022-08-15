# Deall! Test
Demo of NodeJS Express to do CRUD operation on User Collection

## How To Start

### Dependencies

- NodeJS v14 (or higher)
- MongoDB v4.4

### Running the Server

1. Clone this repository
  
2. Install modules needed

```
npm install
```

3. Create `.env` from the example `.env.example`

4. Make sure the database instance  is running

5. Run the server

```
npm start
```

6. Migrate admin credential by accessing `/migrate` endpoints in your browser or postman with `GET` method.

### Development 

After running `npm install`, install husky to force pre-commit hook by running this command

```
npm prepare
```

### Admin Credential

This is the default user credentials

```
{
  "username": "usedeall",
  "password": "usedeall!"
}
```

If you want to update it, [click here](./migrations/admin.json) to open `admin.json` inside `migrations` dir. 

## Project Structure

- **bin**: server runner.
- **deploy**: deployment files (docker, k8s).
- **docs**: server documentations (API docs & others).
- **libs**: libraries used in the sources.
- **migrations**: admin account migration file.
- **middlewares**: middlewares for routes.
- **modules**: sources for api handling.
- **routes**: api routes.
- **test**: unit tests & integration tests.

## Conventions
### Code Style

Code style follows eslint with airbnb style [(click here for the detail)](https://github.com/airbnb/javascript).

### Commit Pre-Hook

Tests & linter will run on git commit pre-hook using husky.

Add `-n` or `--no-verify` flag to git push command to skip it but it is not recommended.

### Commit Message

Commit message style will be forced with commitlint.

Commit message must be prefixed by build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test.

This is the example of how commit message should be:

```
git commit -m "feat: add get user profile api"
```

## API Routes

- `GET` `/`: Ping the server.
- `GET` `/docs`: OpenAPI (Swagger 3.0) documentation.
- `GET` `/migrate`: Run migration to create admin.
- `POST` `/api/v1/auth/register`: Register.
- `POST` `/api/v1/auth/login`: Login.
- `POST` `/api/v1/auth/refresh`: Refresh Token.
- `GET` `/api/v1/profile`: Get Profile (authenticated user & admin only).
- `POST` `/api/v1/users`: Create a new user (admin only)
- `GET` `/api/v1/users`: Read all existing users (admin only)
- `GET` `/api/v1/users/:id`: Read an existing user (admin only)
- `PUT` `/api/v1/users/:id`: Update an existing user (admin only)
- `DELETE` `/api/v1/users/:id`: Delete an existing user (admin only)

## API Documentation

Run the server and go to `/docs` for OpenAPI Documentation, it points to `http://localhost:8000` by default.

You can also [click here](./docs/postman.json) to open `postman.json` for Postman collection.

## How It Works
### Register

```mermaid
graph TD;
    A((Start)) --> B[/Username, Email, Password/];
    B --> C{Request Body Valid?}; 
    C --> |No| V((End));
    C ---> |Yes| E{Email registered?};
    E --> |Yes| X((End));
    E ---> |No| F{Username taken?};
    F --> |Yes| Y((End));
    F ---> |No| G[(Insert into DB)];
    G --> H[Send response]
    H --> Z((End));
```
### Login

```mermaid
graph TD;
    A((Start)) --> B[/Username, Password/];
    B --> C{Request Body Valid?}; 
    C --> |No| D((End));
    C ---> |Yes| E[(Read in DB)];
    E --> F{User registered?};
    F --> |No| G((End));
    F ---> |Yes| H{Password match?}
    H --> |No| I((End));
    H --> |Yes| J[Create authorization token]
    J --> K[Send response]
    K --> L((End))
```

### Get Profile
```mermaid
graph TD;
    A((Start)) --> B[/JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C ---> |Yes| E[(Read in DB)];
    E --> F{User Exist?};
    F --> |No| G((End));
    F ---> |Yes| H[Send response]
    H --> I((End))
```

### Create User
```mermaid
graph TD;
    A((Start)) --> B[/Username, Email, Password, Role, JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C --> E{Request Body Valid?}; 
    E --> |No| F((End));
    E ---> |Yes| G{Email registered?};
    G --> |Yes| H((End));
    G ---> |No| I{Username taken?};
    I --> |Yes| J((End));
    I ---> |No| K[(Insert into DB)];
    K --> L[Send response]
    L --> M((End));
```

### Read Users (collection)
```mermaid
graph TD;
    A((Start)) --> B[/Sort, Page, Limit, JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C ---> |Yes| E[(Read in DB)];
    E --> F[Send response]
    F --> G((End))
```

### Read User (single)
```mermaid
graph TD;
    A((Start)) --> B[/UserID, JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C ---> |Yes| E[(Read in DB)];
    E --> F{User rxist?};
    F --> |No| G((End));
    F ---> |Yes| H[Send response]
    H --> I((End))
```

### Update User
```mermaid
graph TD;
    A((Start)) --> B[/UserId, Username, Email, Password, Role, Delete, Verify, JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C ---> |Yes| E{Request body valid?};
    E --> |No| F((End));
    E ---> |Yes| G[(Read in DB)]
    G --> H{User exist}
    H --> |No| I((End));
    H ---> |Yes| J{Email registered?};
    J --> |Yes| K((End));
    J ---> |No| L{Username taken?};
    L --> |Yes| M((End));
    L ---> |No| N[(Update into DB)];
    N --> O[Send response]
    O --> P((End));
```

### Delete User
```mermaid
graph TD;
    A((Start)) --> B[/JWT/];
    B --> C{Authorized?}; 
    C --> |No| D((End));
    C ---> |Yes| E[(Read in DB)];
    E --> F{User Exist?};
    F --> |No| G((End));
    F ---> |Yes| H[(Delete profile data)]
    H --> I[Send response]
    I --> J((End))
```
## Deployment

### Dependencies
- Docker
- Docker Compose (docker compose)
- Kubernetes (kubectl)

### Configurations

Kubernetes (k8s) configs are stored in [deploy](./deploy/) directory.

To build docker image, use `npm run build` command.

To the image with compose, use `npm run compose` command.

To apply k8s configs, use `npm run kube` command.