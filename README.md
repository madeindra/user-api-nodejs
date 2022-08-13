# Deall! Test
Demo of NodeJS Express to do CRUD operation on User Collection

## How To Start

### Dependencies

### Running the Server

### Admin Credential

## Project Structure

- **bin**: server runner.
- **deploy**: deployment files (docker, k8s).
- **docs**: server documentations (API docs & others).
- **libs**: libraries used in the sources.
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

## How It Works

## Deployment

