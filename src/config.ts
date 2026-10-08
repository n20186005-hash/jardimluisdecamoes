export const siteName = 'Jardim Luís de Camões';
// 规范化主机统一为 www 版本（与 Search Console 主索引主机一致）。
// 非 www 请求应由 Cloudflare 配置 301 跳转到对应的 www URL。
export const defaultDomain = 'www.jardimluisdecamoes.com';

function resolveBaseUrl(): string {
  const fromEnv =
    process.env.CURRENT_SITE_DOMAIN?.trim() || process.env.CURRENT_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.startsWith('http://') || fromEnv.startsWith('https://')
      ? fromEnv.replace(/\/+$/, '')
      : `https://${fromEnv.replace(/\/+$/, '')}`;
  }
  return `https://${defaultDomain}`;
}

/** 站点基地址。优先读取构建/部署时的 CURRENT_SITE_DOMAIN（或 CURRENT_SITE_URL），
 *  未设置时回退到默认正式域名，保证本地构建不中断。 */
export const baseUrl = resolveBaseUrl();
