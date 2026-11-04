// @ts-check
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import astroPlugin from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  // Ignore patterns (applied globally)
  globalIgnores([
    '**/dist/**',
    '**/.astro/**',
    '**/node_modules/**',
    '**/*.d.ts',
    '.husky/**',
    '**/*.config.{js,cjs,mjs}',
    '.lintstagedrc.cjs',
    'commitlint.config.cjs',
  ]),

  // Base JavaScript config
  js.configs.recommended,

  // Base TypeScript config
  ...tseslint.configs.recommended,

  // Astro components: astro-eslint-parser, with the TypeScript parser for
  // the frontmatter and <script> blocks.
  ...astroPlugin.configs.recommended,

  // Custom rules for every source file
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], ['internal'], ['parent'], ['sibling', 'index']],
        },
      ],
      'import/no-unresolved': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },

  // Classic browser scripts served as is from public/ (neither bundled nor
  // type-checked): declare the few browser globals they use.
  {
    files: ['public/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        document: 'readonly',
        localStorage: 'readonly',
      },
    },
  },

  // Prettier config (must be last to override conflicting rules)
  prettierConfig
)
