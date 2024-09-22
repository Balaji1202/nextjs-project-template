## 1. Set Up the Project Structure

1. Create a new directory for your project and navigate into it:

   ```shellscript
   mkdir my-nextjs-project
   cd my-nextjs-project
   ```

2. Initialize a new Node.js project:

   ```shellscript
   npm init -y
   ```

3. Create the basic folder structure:

   ```shellscript
   mkdir -p src/app src/components src/lib
   ```

## 2. Install Dependencies

1. Install Next.js, React, and React DOM:

   ```shellscript
   npm install next react react-dom
   ```

2. Install TypeScript and type definitions:

   ```shellscript
   npm install -D typescript @types/react @types/node
   ```

3. Install ESLint and Prettier:

   ```shellscript
   npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

4. Install additional ESLint plugins for import ordering:

   ```shellscript
   npm install -D eslint-plugin-import eslint-import-resolver-typescript
   ```

## 3. Configure TypeScript

1. Create a `tsconfig.json` file in the root directory:

   ```json
   {
     "compilerOptions": {
       "target": "es5",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "forceConsistentCasingInFileNames": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [
         {
           "name": "next"
         }
       ],
       "paths": {
         "@/*": ["./src/*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

## 4. Configure ESLint and Prettier

1. Create an `.eslintrc.js` file in the root directory:

   ```javascript
   module.exports = {
     parser: '@typescript-eslint/parser',
     extends: [
       'next/core-web-vitals',
       'plugin:@typescript-eslint/recommended',
       'plugin:prettier/recommended',
       'plugin:import/errors',
       'plugin:import/warnings',
       'plugin:import/typescript',
     ],
     plugins: ['@typescript-eslint', 'import'],
     rules: {
       'prettier/prettier': ['error', {}, { usePrettierrc: true }],
       'import/order': [
         'error',
         {
           groups: ['builtin', 'external', 'internal'],
           pathGroups: [
             {
               pattern: 'react',
               group: 'external',
               position: 'before',
             },
           ],
           pathGroupsExcludedImportTypes: ['react'],
           'newlines-between': 'always',
           alphabetize: {
             order: 'asc',
             caseInsensitive: true,
           },
         },
       ],
       '@typescript-eslint/no-unused-vars': ['error'],
       '@typescript-eslint/explicit-function-return-type': ['off'],
       '@typescript-eslint/explicit-module-boundary-types': ['off'],
       '@typescript-eslint/no-explicit-any': ['warn'],
     },
     settings: {
       'import/resolver': {
         typescript: {},
       },
     },
   };
   ```

2. Create a `.prettierrc` file in the root directory:

   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 100,
     "tabWidth": 2,
     "endOfLine": "auto"
   }
   ```

## 5. Set Up Next.js Configuration

1. Create a `next.config.js` file in the root directory:

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
   };

   module.exports = nextConfig;
   ```

## 6. Create Basic Next.js Files

1. Create `src/app/layout.tsx`:

   ```tsx
   import React from 'react';

   export const metadata = {
     title: 'My Next.js App',
     description: 'Created with manual setup',
   };

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>{children}</body>
       </html>
     );
   }
   ```

2. Create `src/app/page.tsx`:

   ```tsx
   import React from 'react';

   export default function Home() {
     return <h1>Welcome to my Next.js app!</h1>;
   }
   ```

## 7. Set Up GitHub Actions Workflows

1. Create a `.github/workflows` directory:

   ```shellscript
   mkdir -p .github/workflows
   ```

2. Create a `lint.yml` file in the `.github/workflows` directory:

   ```yaml
   name: Lint

   on:
     pull_request:
       branches: [main, develop]

   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run lint
   ```

3. Create a `pr-title-checker.yml` file in the `.github/workflows` directory:

   ```yaml
   name: PR Title Checker

   on:
     pull_request:
       types: [opened, edited, synchronize, reopened]

   jobs:
     check-pr-title:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: |
             if [[ ! "${{ github.event.pull_request.title }}" =~ ^(feat|fix|docs|style|refactor|perf|test|chore):.+ ]]; then
               echo "Pull request title does not match the required format."
               echo "It should start with one of: feat:, fix:, docs:, style:, refactor:, perf:, test:, chore:"
               exit 1
             fi
   ```

## 8. Update `package.json` Scripts

1. Update the `scripts` section in `package.json`:

   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint",
     "lint:fix": "next lint --fix",
     "format": "prettier --write ."
   }
   ```

## 9. Update VSCode Settings to Fix Errors on Save

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode", // Ensure Prettier is the default formatter
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always" // Auto-fix ESLint errors on save
  }
}
```

## 10. Final Steps

1. Create a `.gitignore` file:

   ```gitignore
   # dependencies
   /node_modules
   /.pnp
   .pnp.js

   # testing
   /coverage

   # next.js
   /.next/
   /out/

   # production
   /build

   # misc
   .DS_Store
   *.pem

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # local env files
   .env*.local

   # vercel
   .vercel

   # typescript
   *.tsbuildinfo
   next-env.d.ts
   ```

2. Initialize Git repository:

   ```shellscript
   git init
   ```

3. Make an initial commit:

   ```shellscript
   git add .
   git commit -m "Initial commit: Manual Next.js project setup"
   ```

Now you have a manually set up Next.js project with TypeScript support, ESLint and Prettier configuration for code style enforcement, GitHub Actions workflows for linting and PR title checking, a `src` directory structure with App Router, and import alias support.

To start developing, you can run:

```shellscript
npm run dev
```

This will start the development server, and you can begin building your Next.js application with all the configured features in place.
