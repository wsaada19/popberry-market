import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { HomePage, Post } from '@types';
import { About } from '@components/About';
import { LinkCard } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/layouts/PageLayout';
import React from 'react';
import { sortBy } from '@utilities';
import Link from 'next/link';
import { PlayerSkills } from '@components/layouts/PlayerSkills';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
};

export default function Home({ allPostsData, homePageData }: HomeProps) {
  const { name, about, pageDescription, pageTitle } = homePageData;
  return (
    <Layout description={pageDescription} title={`${name} | ${pageTitle}`}>
      <h1 className="mb-2">{name}</h1>
      <About aboutText={about} />
      <section>
        <h2 className="mb-3">Player Skills</h2>
        <PlayerSkills />
      </section>
      <section>
        <h2 className="mb-3">Blog</h2>
        <ul>
          {allPostsData.map(({ title, publishDate, slug, category }) => (
            <li key={slug}>
              <LinkCard className="mb-4 bg-blue-600 text-white" href={`/${category}/${slug}`}>
                <div className="font-semibold">{title}</div>
                <Date dateString={publishDate} />
              </LinkCard>
            </li>
          ))}
        </ul>
        <Link href="/blog">View all blog posts</Link>
      </section>
      {/* <section>
        <h2 className="mt-2 mb-3">Projects</h2>
        <ul className="flex justify-start flex-wrap">
          {projects.map(({ title, slug, color }) => (
            <li className="w-full text-center mb-4" key={slug}>
              <LinkCard
                className={`text-white ${color ?? 'bg-blue-600'}`}
                href={`/portfolio/${slug}`}
              >
                <p className="font-semibold">{title}</p>
              </LinkCard>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const homePage = await getEntriesOfType<HomePage>(ContentfulContentType.HomePage);

  return {
    props: {
      allPostsData: sortBy<Post>(
        (p) => p.publishDate,
        posts.items.filter((post) => post.category === 'blog')
      ).splice(0, 3),
      homePageData: homePage.items[0],
      // projects: sortBy<Post>(
      //   (p) => p.publishDate,
      //   posts.items.filter((post) => post.category === 'portfolio')
      // ),
    },
  };
};
