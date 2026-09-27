import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 不要给 nextConfig 加 NextConfig 类型注解，避免 output 被推断为 string
// 而报类型错误（见 OpenNext + withNextIntl 组合）。
// output 必须是 'standalone'：@opennextjs/cloudflare 需要 .next/standalone
// 产物，写成 'export' 会让 createCacheAssets 找不到 pages-manifest.json。
const nextConfig = {
  output: 'standalone' as const,
  images: {
    remotePatterns: [{ protocol: 'https' as const, hostname: 'images.unsplash.com' }],
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default withNextIntl(nextConfig);
