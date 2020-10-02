# React TypeScript StyledComponents Frontend

## How to Run

- add an `env.development` file at the route level with the following:

```bash
REACT_APP_ENVIRONMENT='development'
REACT_APP_GOOGLE_MAPS_API_KEY='YOUR_GOOGLE_API_KEY
```

- add an `env.production` file at the route level with the following"

```bash
REACT_APP_ENVIRONMENT='production'
REACT_APP_GOOGLE_MAPS_API_KEY='YOUR_GOOGLE_API_KEY
```

- `touch src/App/Config/Env.ts` and paste in the contents (ask for from a dev)
- `yarn install`
- `yarn start`

## How to Build

- `yarn install` if you haven't already
- `yarn build`

The static file output will be in `/build` folder.
