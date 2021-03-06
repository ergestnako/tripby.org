import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from '../Header';
import AppMeta from './Meta';
import Footer from '../Footer';
import TimeMachineWizard from '../TimeMachine/Wizard';

const Wrapper = styled(Flex)`
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled(Box)``;

const Layout = ({ children }) => {
  return (
    <>
      <AppMeta />
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Content flex="1" width={1}>
          {children}
        </Content>
        <Footer />
      </Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
