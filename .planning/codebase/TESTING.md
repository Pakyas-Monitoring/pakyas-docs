# Testing Patterns

**Analysis Date:** 2026-01-24

## Test Framework

**Status:** Not detected

This is a static documentation site using Astro + Starlight. No unit test framework is configured in the project. Test files found during exploration are from `node_modules` dependencies only (zod, mermaid, etc.) and are not part of the documentation project itself.

**Configuration Files:**
- No `jest.config.js`, `vitest.config.js`, or equivalent test runner configuration
- No test scripts in `package.json` (contains only `dev`, `start`, `build`, `preview`, `astro`)

**Why No Tests:**
The pakyas-docs project is a static site generator. It generates HTML documentation from Markdown files and Astro components. Automated testing is limited to:
- Build verification (ensures no build errors)
- Type checking via TypeScript strict mode
- Content validation via schema checking

## Testing Approach

**Build Verification:**
Run `npm run build` to ensure:
- All Markdown frontmatter is valid YAML
- Astro components render without errors
- CSS compilation succeeds
- Static site generation completes

**TypeScript Checking:**
- `tsconfig.json` extends `astro/tsconfigs/strict`
- Strict mode catches type errors in `*.ts` files
- No separate type checking step; validation occurs at build time

**Content Validation:**
- Astro content collections use Zod schema validation via `@astrojs/starlight/schema`
- `src/content.config.ts` defines collection schema:
  ```typescript
  export const collections = {
    docs: defineCollection({
      loader: docsLoader({
        generateId: ({ entry }) => {
          return entry.replace(/\.mdx?$/, '');
        },
      }),
      schema: docsSchema(),
    }),
  };
  ```

## Test Organization

**Not applicable** - no test files in the project source.

**Development Testing:**
- Manual testing via `npm run dev` for local development
- Browser verification of rendered documentation
- Link validation through documentation navigation

## Validation Patterns

**Content Schema:**
Uses Astro Starlight's built-in schema validation:
- Validates all documentation Markdown files
- Enforces required frontmatter fields (`title`, `description`)
- Type-safe access to content metadata

**URL Validation:**
Worker script (`src/worker.js`) validates URLs:
```javascript
// File extension check using regex
!path.match(/\.[a-zA-Z0-9]+$/)
```

**TypeScript Type Safety:**
- Strict mode enabled in `tsconfig.json`
- All TypeScript files must be type-correct
- Astro configuration file uses `// @ts-check` for validation

## Build Process as Verification

**Command:**
```bash
npm run build
```

**What it verifies:**
1. TypeScript compilation succeeds
2. All Markdown frontmatter is valid YAML
3. Content collection schema validation passes
4. Astro integrations (mermaid, starlight) load correctly
5. CSS processes without errors
6. Static site generates to `dist/` directory

**Output:**
- `dist/` directory contains complete static site
- Ready for deployment to Cloudflare Workers via wrangler
- Errors during build prevent deployment

## Development Workflow

**Local Development:**
```bash
npm run dev
# Starts Astro dev server on port 4321
# Hot reload on file changes
# Type checking occurs in editor via TypeScript LSP
```

**Manual Testing:**
- Navigate documentation site during `npm run dev`
- Verify links work (both relative and absolute)
- Check that all markdown files render correctly
- Test responsive design and styling

## Continuous Integration

**No CI configuration detected** in this repository.

**Deployment:**
- Manual or git-based deployment to Cloudflare Workers
- Build must complete successfully before deployment
- `wrangler.json` and `src/worker.js` handle routing

## Mocking

**Not applicable** - static site with no runtime API calls or data fetching.

The worker script (`src/worker.js`) handles URL rewriting but does not mock external services.

## Code Quality Tools

**TypeScript:**
- Strict mode enforces type safety
- Compiler catches errors at build time

**Editor Integration:**
- VSCode workspace settings in `.vscode/` directory
- TypeScript language server provides real-time feedback
- No Prettier/ESLint configuration means defaults apply

## Testing Gaps

**Areas without explicit tests:**
1. **Markdown link validity** - No automated link checker
2. **Content completeness** - No validation that all referenced docs exist
3. **Performance** - No build time benchmarking
4. **Accessibility** - No axe or pa11y integration
5. **Search functionality** - Starlight provides search but no custom search testing

**Recommendations:**
- Add link checker tool (e.g., linkinator) to build pipeline
- Consider adding Lighthouse CI for accessibility/performance metrics
- Implement custom integration test if custom search features added

## Environment Validation

**Configuration:**
- `process.env.PUBLIC_SITE_URL` used in `astro.config.mjs`
- Defaults to `https://pakyas.com` if not set
- `.env` files supported by Astro (none committed to repo)

---

*Testing analysis: 2026-01-24*
