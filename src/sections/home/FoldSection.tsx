import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { HomeFoldSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: theme.palette.primary.main,
    width: '100%',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%);',
    opacity: 0.8,
  },
}));

const query = graphql`
  query homeFoldSection {
    sanityHomePageWeb {
      homeFoldSection {
        title
        body
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
`;

const HomeFoldSection: React.FC<{ className?: string }> = ({ className }) => {
  const styles = useStyles();
  const data = useStaticQuery<HomeFoldSectionQuery>(query);
  const content = data.sanityHomePageWeb?.homeFoldSection;
  const bgImage =
    data?.sanityHomePageWeb?.homeFoldSection?.image?.image?.asset?.url ??
    data?.sanityHomePageWeb?.homeFoldSection?.image?.imageHref;

  return (
    <Box
      sx={[
        {
          background: `url(${bgImage})`,
          paddingTop: { xs: 23.75, sm: 58, xl: 40 },
          height: { xs: 550, sm: 864 },
        },
      ]}
      className={clsx(styles.root, className)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className={styles.backgroundGradient}></div>
        <Title
          align="center"
          color="primary"
          variant="h1"
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            mb: 3,
          }}
        >
          {content?.title}
        </Title>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Body
            color="primary"
            size="xl"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.125rem', sm: '1.62rem' },
              maxWidth: { xs: '90%', sm: 650 },
              textShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {content?.body}
          </Body>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeFoldSection;
