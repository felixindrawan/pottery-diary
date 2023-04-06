# Pottery Diary

## Use
- Android: #TODO
- iOS: #TODO

## Getting Started
1. Follow Expo CLI setup https://docs.expo.dev/get-started/installation/
2. Setup environment variables:
  ```
  TODO
  ```
1. Run
  ```bash
  yarn install
  yarn start
  ```

## Contribute
Creating a feature/fix
1. Create a new branch from latest `dev` branch for a feature/fix
2. Create a PR targetting `dev` following [Conventional Commits](https://www.conventionalcommits.org/) specification when writing commit messages

Importing icons
1. Use https://icons.expo.fyi/ and filter through `MaterialIcons`
2. Utilize `src/components/Icon` component 

## Format
```bash
yarn format
```

If formatting doesn't work, download Prettier through `npx add

## Tech Stack
- Expo CLI with Typescript
- TODO

## Repo Structure
- `src` - Front-end source code
- `docs` - Documentations on the project
  - [`docs/DEV_ISSUES.md`](docs/DEV_ISSUES.md) - Dev issues and solutions
  - [`docs/TODO.md`](docs/TODO.md) - Feature requests and issues

## Figma
Designed by (TODO) 
https://www.figma.com/file/wpNFTFqDPzdsiyElvKO5Qr/Main-App-Flow-%2F-Requirements?node-id=16%3A142&t=wEGgdD8OX8Ai83Dn-1

## Deployment setup
  1. `npm install --global eas-cli`
  2. `npx exp install expo-updates`
  3. `npx expo install expo-updates`

## Building the app
  - Idk when to build but probably just once ~ 
  - `eas build --profile <development|staging|production>`

## Pushing updates
Proper usage should be https://docs.expo.dev/eas-update/eas-update-and-eas-cli/ but we are doing it lazily since it should be handled on push.
  1. Create a branch 
   - `eas update --branch <dev|staging|main> --message "message"` 
  2. Link the branch to the channel
   - `eas channel:edit <development|staging|production> --branch branch-name`

## Environment
Different options to retrieve environemnt vars
  - add secrets in expo
    - can use @env to retrieve the values
  - add it to the app.config.ts
    - Constants.expoConfig.extra.variable to retrieve

## Routing 
Routing is done using React-navigation

How it works: 
 - Root Navigator (stack)
   - BottomTab
     - homeStack
       - screens
     - profileStack
       - screens
   - AuthStack (if any)
   - LogStack


## Local set up
 - Turn on developer mode
 - set up wireless debugging

