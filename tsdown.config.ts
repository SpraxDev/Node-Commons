import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  entry: ['./src/index.ts', './src/http/index.ts'],
  platform: 'node',
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: false,
  sourcemap: true,
  exports: true,
});
export default config;
