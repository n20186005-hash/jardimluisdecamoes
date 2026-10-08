import { createTopicPage } from '@/lib/topic';

const { generateStaticParams, generateMetadata, Page } = createTopicPage(
  'oQueVisitar',
  '/o-que-visitar-em-leiria'
);

export { generateStaticParams, generateMetadata };
export default Page;
