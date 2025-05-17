import { Layout as AntLayout, Flex } from 'antd';
import React from 'react';
import HeaderMenu from '../HeaderMenu';
const { Content } = AntLayout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  maxWidth: '100vw',
};

const Layout = ({ children }) => (
  <Flex gap="middle" wrap>
    <AntLayout style={layoutStyle}>
      <HeaderMenu />
      <Content style={{ minHeight: 'calc(100vh - var(--header-height))', padding: '2rem' }}>{children}</Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </AntLayout>
  </Flex>
);
export default Layout;
