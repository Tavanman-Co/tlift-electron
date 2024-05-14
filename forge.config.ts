import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import * as path from 'path'; // Import 'path' to manipulate file paths

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

// Define the base path for the icons
const iconPath = path.resolve(__dirname, './icon/icon.ico'); // Resolving the absolute path

const config: ForgeConfig = {
  packagerConfig: {
    icon: iconPath, // Using the resolved path
    // Define the working directory explicitly
    
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      iconUrl: iconPath, // Using the resolved path
      setupIcon: iconPath, // Using the resolved path
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({
      options: {
        icon: iconPath, // Using the resolved path
      },
    }),
    new MakerDeb({
      options: {
        icon: iconPath, // Using the resolved path
      },
    }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "default-src 'self' 'unsafe-eval' 'unsafe-inline' static: http: https: ws:",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
