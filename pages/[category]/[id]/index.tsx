import { ContentfulContentType, getAssetById, getEntriesOfType } from '@services/contentful';
import { ContentfulImage, Post, PostLayoutProps } from '@types';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ContentfulRichTextRenderer } from '@components/ContentfulRichTextRenderer';
import { HeroBanner } from '@components/HeroBanner';
import PageLayout from '@components/layouts/PageLayout';
import { capitalizeFirstLetter } from '@utilities';
import { ArticleLd } from '@components/schema/SchemaComponents';

export default function PostPage({ post, image, includedEntries, assets }: PostLayoutProps) {
  const { title, shortSummary, summary, publishDate } = post;
  return (
    <PageLayout description={shortSummary} title={title}>
      <ArticleLd description={shortSummary} title={title} datePublished={publishDate} />
      <article className="md:px-10">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: capitalizeFirstLetter(post.category), href: `/${post.category}` },
            { label: post.title, href: post.slug },
          ]}
        />
        <HeroBanner title={title} image={image} summary={shortSummary} />
        <ContentfulRichTextRenderer
          richText={summary}
          includedEntries={includedEntries}
          assets={assets}
        />
      </article>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const skipPaths = ['nba-rating-chart'];
  const paths = projectContentfulData.items
    .filter((post) => !skipPaths.includes(post.slug))
    .map((item) => {
      return {
        params: {
          category: item.category,
          id: item.slug,
        },
      };
    });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectContentfulData = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const blogPost = projectContentfulData.items.find((item) => {
    return item.slug == params.id;
  });

  const assetsInSummary = blogPost.summary.content.filter(
    (content) => content.nodeType === 'embedded-asset-block'
  );
  const assets = [];
  for (let i = 0; i < assetsInSummary.length; i++) {
    const id = assetsInSummary[i].data.target.sys.id;
    const img = await getAssetById(id);
    assets.push(img);
  }

  let image: { fields: ContentfulImage };
  if (blogPost.summaryImage) {
    image = await getAssetById(blogPost.summaryImage.sys.id);
  }
  return {
    props: {
      post: blogPost,
      image: image ? image.fields : {},
      includedEntries: projectContentfulData.includes?.Entry ?? [],
      assets,
    },
  };
};
