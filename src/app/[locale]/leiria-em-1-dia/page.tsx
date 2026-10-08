import { createTopicPage } from '@/lib/topic';

const { generateStaticParams, generateMetadata, Page } = createTopicPage(
  'leiria1Dia',
  '/leiria-em-1-dia'
);

export { generateStaticParams, generateMetadata };
export default Page;
