import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { HomePartnersSectionQuery } from '../../generated/graphql';
import CarouselSection from '@regen-network/web-components/lib/components/organisms/CarouselSection';
import { Box } from '@mui/material';

const query = graphql`
  query homePartnersSection {
    sanityHomePageWeb {
      homeWebPartnersSection {
        title
        partners {
          name
          logo {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

const PartnersSection: React.FC = () => {
  const { sanityHomePageWeb } = useStaticQuery<HomePartnersSectionQuery>(query);
  const content = sanityHomePageWeb?.homeWebPartnersSection;

  return (
    <CarouselSection title={content?.title ?? ''} sx={{ px: { xs: 0, lg: 0 } }}>
      {content?.partners?.map(partner => (
        <Box key={partner?.name}>
          <img
            src={partner?.logo?.asset?.url ?? ''}
            alt={partner?.name ?? ''}
          />
        </Box>
      ))}
    </CarouselSection>
  );
};

export default PartnersSection;
