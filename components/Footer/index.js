import React from 'react';
import { space } from 'styled-system';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import Container from '../Container';
import Text from '../Text';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const links = [
  {
    id: 'twitter',
    url: 'https://twitter.com/tripby_',
  },
  {
    id: 'github',
    url: 'https://github.com/tripby/tripby.org',
  },
];

const Anchor = styled.a`
  ${space}
`;

const Wrapper = styled(Flex)`
  justify-content: space-between;
  border-top: ${({ theme }) => theme.border};
`;

Wrapper.defaultProps = {
  variant: 'primary',
  py: 3,
};

const Footer = () => (
  <Container>
    <Wrapper flexWrap="wrap" m={-1}>
      <Flex m={-2} p={1}>
        {links.map(link => (
          <Box p={2} key={link.id}>
            <Anchor href={link.url}>
              <Text variant="secondary">{link.id}</Text>
            </Anchor>
          </Box>
        ))}
      </Flex>
      <Text fontSize={0} p={1} variant="secondary">
        <FormattedHTMLMessage id="App.license" />
      </Text>
      <a
        href="https://psychonautwiki.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text p={1} fontSize={0} variant="secondary">
          <FormattedMessage id="App.wikiCredits" />
        </Text>
      </a>
    </Wrapper>
  </Container>
);

export default Footer;