# Development Issues
Documented development issues I've ran into while developing the app

### `Unable to resolve "@/pages/HomePage" from "App.tsx"`
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
and `App.tsx` importing `HomePage` as normal, I ran into the error above

Solutions: 
1. Instead of using Path Aliases, use relative instead 
e.g. `import HomePage from './src/pages/HomePage';`
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
Solutions: Not too clear what fixed it to be honest but
1. `yarn add -D @types/node`
2. Add `"jsx": "react-jsx",` on `tsconfig` under `compilerOptions`
3. Restart VsCode
