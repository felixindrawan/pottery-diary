# Development Issues
Documented development issues I've ran into while developing the app

### `Unable to resolve "@/screens/HomeScreen" from "App.tsx"`
Using the `tsconfig.json` as follows
```bash
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
and `App.tsx` importing `HomeScreen` as normal, I ran into the error above

Solutions: 
1. Instead of using Path Aliases, use relative instead 
e.g. `import HomeScreen from './src/screens/HomeScreen';`
2. **Accepted Solution**: https://stackoverflow.com/questions/57798793
Change `compilerOptions` to 
```bash
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "src/*": ["src/*"]
    }
  }
```
and add `package.json` under `/src`
```bash
{
  "name": "src"
}
```

### `React/TypeScript error: Operator '<' cannot be applied to types 'boolean' and 'RegExp'-Reactjs`
This requires us to somehow need to add `import React from 'react'` line
Solutions: Not too clear what fixed it to be honest but
1. `yarn add -D @types/node`
2. Add `"jsx": "react-jsx",` on `tsconfig` under `compilerOptions`
3. Restart VsCode

### `While resolving module `src/components/View`, the Haste package `src` was found. However the module `components/View` could not be found within the package. Indeed, none of these files exist:`
Solution: `yarn start`