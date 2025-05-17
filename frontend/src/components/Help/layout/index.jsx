import { Layout as AntLayout, Flex } from 'antd';
import React from 'react';
import HelpLPHeader from '../header';
import HelpLPHero from '../hero';
const { Content } = AntLayout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  maxWidth: '100vw',
};

const HelpLPLayout = ({ children }) => (
  <Flex gap="middle" wrap>
    <AntLayout style={layoutStyle}>
      <HelpLPHeader />
      <HelpLPHero />
      <Content style={{ minHeight: 'calc(100vh - var(--header-height))', padding: '2rem' }}>{children}</Content>
    </AntLayout>
  </Flex>
);
export default HelpLPLayout;
