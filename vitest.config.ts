import { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';

const config: UserConfig = defineConfig({
  test: {
    environment: 'node',
    clearMocks: true,
    restoreMocks: true,
    globals: true,

    dir: './tests/',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './reports/coverage/',
      include: [
        'src/**/*.ts',
      ],
    },
  },
});
export default config;
