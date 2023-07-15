import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)} style={{background: `no-repeat center/cover url(${require("@site/static/img/home-banner.jpg").default})`}}>
      <div className={clsx(styles.heroContainer)} >
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title='Home'
      description="A skill-based ancient fantasy TTRPG!">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
