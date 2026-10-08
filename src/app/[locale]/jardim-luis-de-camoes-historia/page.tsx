import { createTopicPage } from '@/lib/topic';

const { generateStaticParams, generateMetadata, Page } = createTopicPage(
  'historia',
  '/jardim-luis-de-camoes-historia'
);

export { generateStaticParams, generateMetadata };
export default Page;
