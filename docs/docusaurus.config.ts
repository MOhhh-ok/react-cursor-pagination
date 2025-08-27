import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'React Cursor Pagination',
  favicon: 'img/favicon.ico',
  url: 'https://mohhh-ok.github.io',
  baseUrl: '/react-cursor-pagination/',
  organizationName: 'mohhh-ok',
  projectName: 'react-cursor-pagination',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  trailingSlash: false,
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies import('@docusaurus/preset-classic').Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    navbar: {
      title: 'React Cursor Pagination',
      items: [
        { type: 'doc', docId: 'quick-start', position: 'left', label: 'Docs' },
        { to: '/docs/api', label: 'API', position: 'left' },
        { to: '/docs/examples', label: 'Examples', position: 'left' },
        { href: 'https://github.com/mohhh-ok/react-cursor-pagination', label: 'GitHub', position: 'right' },
      ],
    },
  },
  plugins: [
    function allowExtensionlessEsm() {
      return {
        name: 'allow-extensionless-esm',
        configureWebpack() {
          return {
            resolve: {
              fullySpecified: false,
            },
          };
        },
      };
    },
  ],
};

export default config;


