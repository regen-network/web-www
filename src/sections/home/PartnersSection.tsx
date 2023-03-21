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
  const partners = content?.partners ?? [];

  return (
    <CarouselSection
      settings={{ variableWidth: true }}
      title={content?.title ?? ''}
      sx={{ px: { xs: 0, lg: 0 }, pt: { xs: 0, lg: 0 } }}
    >
      {partners?.map((partner, index) => {
        return (
          <Box
            key={partner?.name}
            sx={{
              display: 'flex !important',
              alignItems: 'center',
              mr: 13.75,
              minHeight: 94,
            }}
          >
            <img
              src={partner?.logo?.asset?.url ?? ''}
              alt={partner?.name ?? ''}
            />
          </Box>
        );
      })}
    </CarouselSection>
  );
};

export default PartnersSection;
