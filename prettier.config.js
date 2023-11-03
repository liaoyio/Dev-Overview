module.exports = {
  bracketSpacing: true,
  semi: false,
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  importOrder: [
    '(^(react/(.*)$)|^(react$))|(^(next/(.*)$)|^(next$))',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^@/styles/(.*)$',
    '^@/public/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^#/(.*)$'
  ],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
  plugins: ['prettier-plugin-tailwindcss']
}
