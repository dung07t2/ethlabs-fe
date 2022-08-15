# EthLabs FE

[https://ethlabs.vercel.app/](https://ethlabs.vercel.app/)

## Account for test:

rayle@sponsee.io/Password55

## _Keywords_

- React, nextjs, typescript, redux, redux toolkit, react query
- @mui, @material, formilk, yup
- jest, babel-jest, cypress
- Firebase
- Vercel

## Note

- Use yarn instead of npm is better
- Add .env file. Eg:

```sh
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://us-central1-rayprojects.cloudfunctions.net/ethlabs/api/"

# Setup firebase

NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- I also create an api for demo.
  [api source](https://github.com/dung07t2/ethlabs-api)

## Installation

The api requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
yarn
yarn dev
```

For production deployment

```sh
yarn build
```

## Ideas

- I'm trying to build nextjs boilerplate as well as a website like pinterest basically.

#### Structures

[structure](./screenshots/structure.png)

#### Screenshots

[home](./screenshots/home.png)
[dashboard](./screenshots/dashboard.png)
[newsFeed](./screenshots/newsfeed.png)

## License

Disclaimer: Everything you see here is open and free to use.
