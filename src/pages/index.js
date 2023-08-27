import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)} style={{background: `no-repeat center/cover url(${require("@site/static/img/home-banner.jpg").default})`}}>
      <div className={clsx(styles.heroContainer)} >
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <div className={clsx(styles.contentContainer)} >
          <div style={{paddingTop: '0.5rem', display: 'flex', gap: '0.5rem'}}>
            <WarningAmberIcon />
            <h3>{'Disclaimer for Play'}</h3>
          </div>
          <p>{'While this game has been in development for the last 4 years, it is still under active development and only has been playtested for a few times. All rules, player options, and other content are still incomplete and subject to change. The content of this game will update regularily and without notice.'}</p>
        </div>
    </header>
  );
}

export default function Home() {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title='Home'
      description="Welcome to Nexus RPG. A skill-based ancient fantasy TTRPG!">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
