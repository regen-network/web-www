import Section from '@regen-network/web-components/lib/components/organisms/Section';
import EcologicalCreditCard from '@regen-network/web-components/lib/components/molecules/EcologicalCreditCard';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  HomeWebEcologicalCreditCardsSectionQuery,
  SanityHomeWebEcologicalCreditCardsSection,
} from '../../generated/graphql';
import { normalizeEcologicalCreditCards } from '../../util/normalizers/normalizeEcologicalCreditCards';
import { Link } from '@mui/material';

const query = graphql`
  query homeWebEcologicalCreditCardsSection {
    sanityHomePageWeb {
      homeWebEcologicalCreditCardsSection {
        title
        cards {
          title
          description
          image {
            imageHref
            imageAlt
            image {
              asset {
                url
              }
            }
          }
          type {
            name
            image {
              asset {
                url
              }
            }
          }
          creditInfos {
            country
            price
            count
          }
          offsetMethods {
            name
            icon {
              asset {
                url
              }
            }
          }
          projectActivities {
            name
            icon {
              asset {
                url
              }
            }
          }
          button {
            buttonText
            buttonLink {
              buttonHref
            }
          }
        }
      }
    }
  }
`;

const EcologicalCreditCardsSection: React.FC = () => {
  const { sanityHomePageWeb } =
    useStaticQuery<HomeWebEcologicalCreditCardsSectionQuery>(query);
  const content: SanityHomeWebEcologicalCreditCardsSection | undefined =
    sanityHomePageWeb?.homeWebEcologicalCreditCardsSection as any;
  const cards = normalizeEcologicalCreditCards({ content });

  return (
    <Section title={content?.title ?? ''}>
      <ResponsiveSlider
        items={cards.map(card => (
          <EcologicalCreditCard
            key={card.title}
            linkComponent={props => (
              <Link {...props} target={props.target || '_blank'} />
            )}
            sx={{ mb: { xs: 5, sm: 7.5 } }}
            {...card}
          />
        ))}
        slidesToShow={1}
        adaptiveHeight
        dots
        itemWidth="100%"
      />
    </Section>
  );
};

export default EcologicalCreditCardsSection;
