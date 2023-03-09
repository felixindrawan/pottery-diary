# Development Issues
Documented development issues I've ran into while developing the app

1. `Unable to resolve "@/pages/HomePage" from "App.tsx"`
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