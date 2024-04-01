/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^ui/(.*)$': '<rootDir>/src/components/ui/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^types/(.*)$': '<rootDir>/src/types/$1',
        '^features/(.*)$': '<rootDir>/src/features/$1',
        '^routes/(.*)$': '<rootDir>/src/routes/$1'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};
