import type { LocalizedText } from './expanded-guides';

// Safe localized-text accessor. Mirandese (mwl) intentionally falls back to the
// Portuguese source because we do not fabricate Mirandese guide content.
export function lt(text: LocalizedText, locale: string): string {
  return (text as Record<string, string>)[locale] ?? text.pt;
}

type GuideLabels = {
  eyebrowPlace: string;
  eyebrowPlan: string;
  aboutTitle: (title: string) => string;
  discoverTitle: (title: string) => string;
  organizeTitle: string;
  durationTitle: string;
  forWhomTitle: string;
  orderTitle: string;
  highlightsTitle: string;
  highlights: [string, string, string, string];
  histArchTitle: string;
  observeTitle: string;
  routeTitle: string;
  photoTitle: string;
  tipsTitle: string;
  essentialsTitle: string;
  openingTitle: string;
  accessTitle: string;
  lodgingTitle: string;
  reviewsTitle: string;
  faqTitle: string;
  relatedTitle: string;
  sourcesTitle: string;
  seeOnMaps: (title: string) => string;
  routeMapLabel: (dest: string) => string;
  navLocation: string;
  viewRoute: string;
  allGuides: string;
  infoLocation: string;
  infoExperience: string;
  infoStart: string;
  infoTickets: string;
  openingHours: string;
  openingPrice: string;
  accessItems: string[];
  lodgingText: (title: string) => string;
  reviewsText: string;
  transportNote: string;
  openingHoursText: string;
  openingPriceText: string;
  faq: (title: string, fallbackPhotoTip: string) => { q: string; a: string }[];
  highlightsLabelsNote: string;
};

const pt: GuideLabels = {
  eyebrowPlace: 'Pontos de interesse em Leiria',
  eyebrowPlan: 'Planeie o seu passeio',
  aboutTitle: (t) => `Sobre ${t}`,
  discoverTitle: (t) => `Descobrir ${t}`,
  organizeTitle: 'Como organizar a visita',
  durationTitle: 'Duração sugerida',
  forWhomTitle: 'Para quem',
  orderTitle: 'Ordem recomendada',
  highlightsTitle: 'Quatro destaques',
  highlights: ['Identidade do local', 'História e arquitetura', 'Elementos a observar', 'Conselho de visita'],
  histArchTitle: 'História, arquitetura e paisagem',
  observeTitle: 'O que observar durante a visita',
  routeTitle: 'Percurso recomendado a pé',
  photoTitle: 'Fotografia e melhores enquadramentos',
  tipsTitle: 'Conselhos de visita e transportes',
  essentialsTitle: 'Informações essenciais',
  openingTitle: 'Abertura e bilhetes',
  accessTitle: 'Acessibilidade e cuidados',
  lodgingTitle: 'Alojamento na zona',
  reviewsTitle: 'Opiniões de visitantes',
  faqTitle: 'Perguntas frequentes',
  relatedTitle: 'Outros guias relacionados',
  sourcesTitle: 'Fontes para aprofundar',
  seeOnMaps: (t) => `Ver ${t} no Google Maps`,
  routeMapLabel: (d) => `Ver percurso: Jardim Luís de Camões → ${d}`,
  navLocation: 'Localização e navegação específica',
  viewRoute: 'Abrir trajeto no Google Maps',
  allGuides: 'Ver todos os guias de Leiria',
  infoLocation: 'Localização',
  infoExperience: 'Tipo de experiência',
  infoStart: 'Ponto de partida sugerido',
  infoTickets: 'Bilhetes e horários',
  openingHours: 'Horários de visita',
  openingPrice: 'Preço e reservas',
  accessItems: [
    'Nas ruas históricas, calçada irregular e declives podem dificultar deslocações.',
    'Confirme rampas, elevadores e eventuais percursos alternativos com o equipamento visitado.',
    'Respeite o património, a sinalização, os residentes e os momentos de culto.',
  ],
  lodgingText: (t) => `A zona central de Leiria é prática para quem quer combinar ${t} com outros passeios a pé. Se viajar de carro, compare alojamentos com estacionamento; se depender de autocarros, verifique a ligação às paragens utilizadas. Preços, disponibilidade e acessibilidade devem ser consultados diretamente antes da reserva.`,
  reviewsText: 'As fotografias e avaliações recentes no Google Maps ajudam a conhecer experiências de acesso, afluência e conservação, complementando o planeamento da visita.',
  transportNote: 'Para chegar de transportes públicos, consulte o operador que serve Leiria e conclua a última etapa a pé. Quem vem de carro deve respeitar a sinalização e verificar o estacionamento local. Serviços e entradas de edifícios podem ter horários próprios.',
  openingHoursText: 'O acesso a interiores, museus e monumentos pode depender de calendário próprio. Consulte o serviço responsável e os avisos no local, incluindo alterações por eventos ou obras.',
  openingPriceText: 'A observação exterior em espaços públicos não equivale a entrada num monumento. Para espaços de acesso controlado, confira tarifas, descontos e reservas no canal da entidade responsável.',
  faq: (title, fallback) => [
    { q: `O que vale a pena observar em ${title}?`, a: '' },
    { q: `Como organizar a visita a ${title}?`, a: '' },
    { q: `Que cuidados devo ter antes de visitar ${title}?`, a: '' },
    { q: `Qual é o melhor local para fotografar ${title}?`, a: fallback },
  ],
  highlightsLabelsNote: 'Ajuste o trajeto ao relevo, pavimentos e acessos abertos no dia.',
};

const en: GuideLabels = {
  eyebrowPlace: 'Points of interest in Leiria',
  eyebrowPlan: 'Plan your outing',
  aboutTitle: (t) => `About ${t}`,
  discoverTitle: (t) => `Discover ${t}`,
  organizeTitle: 'How to plan the visit',
  durationTitle: 'Suggested duration',
  forWhomTitle: 'For whom',
  orderTitle: 'Recommended order',
  highlightsTitle: 'Four highlights',
  highlights: ['Local identity', 'History and architecture', 'What to observe', 'Visiting tip'],
  histArchTitle: 'History, architecture and landscape',
  observeTitle: 'What to observe during the visit',
  routeTitle: 'Recommended walking route',
  photoTitle: 'Photography and best angles',
  tipsTitle: 'Visiting tips and transport',
  essentialsTitle: 'Essential information',
  openingTitle: 'Opening and tickets',
  accessTitle: 'Accessibility and care',
  lodgingTitle: 'Accommodation nearby',
  reviewsTitle: 'Visitor opinions',
  faqTitle: 'Frequently asked questions',
  relatedTitle: 'Other related guides',
  sourcesTitle: 'Sources to go deeper',
  seeOnMaps: (t) => `View ${t} on Google Maps`,
  routeMapLabel: (d) => `View route: Jardim Luís de Camões → ${d}`,
  navLocation: 'Specific location and navigation',
  viewRoute: 'Open route in Google Maps',
  allGuides: 'See all Leiria guides',
  infoLocation: 'Location',
  infoExperience: 'Type of experience',
  infoStart: 'Suggested starting point',
  infoTickets: 'Tickets and hours',
  openingHours: 'Visiting hours',
  openingPrice: 'Price and reservations',
  accessItems: [
    'On the historic streets, uneven cobbles and slopes can make movement difficult.',
    'Confirm ramps, lifts and any alternative routes with the venue you are visiting.',
    'Respect the heritage, the signage, residents and moments of worship.',
  ],
  lodgingText: (t) => `Central Leiria is convenient for combining ${t} with other walks on foot. If you travel by car, compare accommodation with parking; if you rely on buses, check the connection to the stops you use. Prices, availability and accessibility should be checked directly before booking.`,
  reviewsText: 'Recent photos and reviews on Google Maps help you learn about access, crowding and conservation, complementing your visit planning.',
  transportNote: 'To arrive by public transport, check the operator serving Leiria and finish the last leg on foot. Those driving should follow signage and check local parking. Services and building entries may keep their own hours.',
  openingHoursText: 'Access to interiors, museums and monuments may depend on their own calendar. Check the responsible service and the on-site notices, including changes for events or works.',
  openingPriceText: 'Observing the exterior in public spaces is not the same as entering a monument. For controlled-access spaces, check fees, discounts and reservations via the responsible entity’s channel.',
  faq: (title, fallback) => [
    { q: `What is worth observing at ${title}?`, a: '' },
    { q: `How should I plan a visit to ${title}?`, a: '' },
    { q: `What should I check before visiting ${title}?`, a: '' },
    { q: `What is the best spot to photograph ${title}?`, a: fallback },
  ],
  highlightsLabelsNote: 'Adjust the route to the terrain, surfaces and open accesses on the day.',
};

const zh: GuideLabels = {
  eyebrowPlace: '莱里亚值得一游的景点',
  eyebrowPlan: '规划你的行程',
  aboutTitle: (t) => `关于${t}`,
  discoverTitle: (t) => `探索${t}`,
  organizeTitle: '如何规划参观',
  durationTitle: '建议时长',
  forWhomTitle: '适合人群',
  orderTitle: '推荐顺序',
  highlightsTitle: '四大亮点',
  highlights: ['当地特色', '历史与建筑', '可观之处', '参观建议'],
  histArchTitle: '历史、建筑与景观',
  observeTitle: '参观时值得观察什么',
  routeTitle: '推荐步行路线',
  photoTitle: '摄影与最佳机位',
  tipsTitle: '参观贴士与交通',
  essentialsTitle: '基本信息',
  openingTitle: '开放与门票',
  accessTitle: '无障碍与注意事项',
  lodgingTitle: '周边住宿',
  reviewsTitle: '游客评价',
  faqTitle: '常见问题',
  relatedTitle: '其他相关指南',
  sourcesTitle: '深入了解的资料来源',
  seeOnMaps: (t) => `在 Google Maps 查看${t}`,
  routeMapLabel: (d) => `查看路线：Jardim Luís de Camões → ${d}`,
  navLocation: '具体位置与导航',
  viewRoute: '在 Google Maps 打开路线',
  allGuides: '查看全部莱里亚指南',
  infoLocation: '位置',
  infoExperience: '体验类型',
  infoStart: '建议起点',
  infoTickets: '门票与开放时间',
  openingHours: '开放时间',
  openingPrice: '票价与预订',
  accessItems: [
    '历史街区的碎石路面不平整、且有坡度，可能影响通行。',
    '请向所访场所确认坡道、电梯及可能的替代路线。',
    '请尊重遗产、标识、居民与礼拜时刻。',
  ],
  lodgingText: (t) => `莱里亚中心区便于将${t}与其他步行行程结合。若自驾，可比较带停车位的住宿；若依赖公交，请确认与所乘站点的衔接。价格、空房与无障碍情况请在预订前直接查询。`,
  reviewsText: 'Google Maps 上的近期照片与评价，有助于了解通行、人流与保护状况，为行程规划作补充。',
  transportNote: '若乘公共交通，请查询服务莱里亚的运营商，并以步行完成最后一段。自驾者请遵守标识并确认当地停车。各服务与建筑入口可能有各自的开放时间。',
  openingHoursText: '博物馆与纪念碑等室内空间的开放可能取决于各自的日程。请查询负责单位与现场告示，包括因活动或施工产生的变动。',
  openingPriceText: '在公共空间观察外部并不等同于进入纪念碑。对于受控进入的空间，请通过负责单位的渠道查询费用、优惠与预订。',
  faq: (title, fallback) => [
    { q: `在${title}值得观察什么？`, a: '' },
    { q: `应如何规划${title}的参观？`, a: '' },
    { q: `参观${title}前需要注意什么？`, a: '' },
    { q: `拍摄${title}的最佳机位是哪里？`, a: fallback },
  ],
  highlightsLabelsNote: '请根据当天地形、路面与开放通道调整路线。',
};

export const guideLabels: Record<string, GuideLabels> = {
  pt,
  en,
  zh,
  // Mirandese reuses Portuguese labels on purpose (no fabricated content).
  mwl: pt,
};

export function guideLabel(locale: string): GuideLabels {
  return guideLabels[locale] ?? pt;
}
