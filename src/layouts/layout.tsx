/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { makeStyles } from '@mui/styles';
import CookiesFooter from '@regen-network/web-components/lib/components/banner/CookiesBanner';
import Footer, {
  FooterItemProps as FooterItem,
} from '@regen-network/web-components/lib/components/footer';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { PageProps } from 'gatsby';

import { MarketingNav } from '../components/MarketingNav';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

const Layout: React.FC<PageProps> = ({ children, location }) => {
  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'community',
      items: [
        {
          title: 'Marketplace',
          href: 'https://app.regen.network',
        },
        {
          title: 'Registry',
          href: 'https://regennetwork.notion.site/Welcome-to-Regen-Registry-0d55aab2a2d64f27aee2a468df172990',
        },
        {
          title: 'Built on Regen',
          href: 'https://regennetwork.notion.site/Built-On-Regen-Network-c6266114116842e389258747454f9f07',
        },
        {
          title: 'Regen Foundation',
          href: 'https://regen.foundation/',
          target: '_blank',
        },
        {
          title: 'Cerulean Ventures',
          href: 'https://cerulean.vc/',
          target: '_blank',
        },
      ],
    },
    {
      title: 'registry',
      items: [
        {
          title: 'Program Guide',
          href: 'https://library.regen.network/v/regen-registry-program-guide/',
        },
        {
          title: 'Create Methodology',
          href: 'https://library.regen.network/v/regen-registry-program-guide/methodology-development/methodology-development-overview',
        },
        {
          title: 'Metholodology Review',
          href: 'https://library.regen.network/v/regen-registry-program-guide/methodology-development/methodology-review-process',
        },
        {
          title: 'Metholodology Library',
          href: 'https://library.regen.network/v/methodology-library/',
        },
      ],
    },
    {
      title: 'ecosystem',
      items: [
        {
          title: 'Guides',
          href: 'https://guides.regen.network/',
        },
        {
          title: 'Governance',
          href: 'https://forum.regen.network/overview',
        },
        {
          title: 'Docs',
          href: 'https://docs.regen.network/',
        },
        {
          title: 'Whitepaper',
          href: 'https://regen-network.gitlab.io/whitepaper/WhitePaper.pdf',
        },
        {
          title: '$Regen Token',
          href: '/token/',
        },
        {
          title: 'FAQ',
          href: '/faq/',
        },
      ],
    },
    {
      title: 'company',
      items: [
        {
          title: 'Media',
          href: '/media/',
        },
        {
          title: 'Press Kit',
          href: '/press-kit/',
        },
        {
          title: 'Team',
          href: '/team/',
        },
        {
          title: 'Careers',
          href: 'https://regennetwork.notion.site/Careers-at-Regen-Network-fe7d9645a39843cfb7eaceb7171d95af',
        },
        {
          title: 'Contact',
          href: '/contact/',
        },
        {
          title: 'Resources',
          href: '/resources/',
        },
      ],
    },
  ];
  const styles = useStyles();
  return (
    <>
      <MarketingNav location={location} />
      <div>
        <main className={styles.root}>{children}</main>
      </div>
      <CookiesFooter privacyUrl="/privacy-policy/" />
      <footer>
        <Footer
          footerItems={footerItems}
          privacyUrl="/privacy-policy"
          termsUrl="/terms-service"
          apiUri={process.env.GATSBY_API_URI}
        />
      </footer>
    </>
  );
};

export default Layout;
