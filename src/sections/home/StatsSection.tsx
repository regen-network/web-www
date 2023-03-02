import StatCardsSection from '@regen-network/web-components/lib/components/organisms/StatCardsSection';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { HomeStatsSectionQuery } from '../../generated/graphql';
import { normalizeStatCards } from '../../util/normalizers/normalizeStatCards';

const query = graphql`
  query homeStatsSection {
    sanityHomePageWeb {
      homeWebStatsSection {
        label
        title
        cards {
          label
          stat
          _rawDescription
          image {
            imageHref
            imageAlt
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const StatsSection: React.FC = () => {
  const { sanityHomePageWeb } = useStaticQuery<HomeStatsSectionQuery>(query);
  const content = sanityHomePageWeb?.homeWebStatsSection;
  const cards = normalizeStatCards({ content: sanityHomePageWeb });

  return (
    <StatCardsSection
      label={content?.label ?? ''}
      title={content?.title ?? ''}
      cards={cards}
    />
  );
};

export default StatsSection;
