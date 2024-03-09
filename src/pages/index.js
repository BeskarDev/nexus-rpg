import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import styles from './index.module.css';

function Card({ label, href }) {
  return (
    <a href={href} style={{textDecoration: 'none'}}>
      <div className={clsx(styles.card)}>
        <h2>{label}</h2>
      </div>
    </a>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const navbarItems = Array.from(document.querySelectorAll('.navbar__item.navbar__link'))
      .map(element => ({ label: element.textContent, href: element.href }))
      .filter(element => element.label !== 'GitHub');

    setItems(navbarItems);
  }, []);

  return (
    <Layout
      title='Home'
      description="Welcome to Nexus RPG. A skill-based ancient fantasy TTRPG!">
      <header className={clsx(styles.heroBanner)} style={{background: `no-repeat center/cover url(${require("@site/static/img/home-banner.jpg").default})`}}>
        <div className={clsx(styles.heroContainer)} >
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>         
        <h2 style={{ marginTop: '3rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '8px', color: 'white', maxWidth: '1400px', marginInline: 'auto' }}>Chapters</h2>
        <main style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', maxWidth: '1400px', marginInline: 'auto' }}>
          {items.map((item, index) => <Card key={index} {...item} />)}
        </main>
        <div className={clsx(styles.contentContainer)}>
            <div style={{paddingTop: '0.5rem', display: 'flex', gap: '0.5rem'}}>
              <WarningAmberIcon />
              <h3>Disclaimer for Play</h3>
            </div>
            <p>While this game has been in development for the last 4 years, it is still under active development and only has been playtested for a few times. All rules, player options, and other content are subject to change. The content of this game will still change frequently and without notice (though I try to list all major changes in the github release notes).</p>
        </div> 
      </header>
    </Layout>
  );
}
