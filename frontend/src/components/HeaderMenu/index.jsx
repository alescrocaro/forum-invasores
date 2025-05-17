import { Layout as AntLayout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import LinkWithoutDecoration from '../LinkWithoutDecoration';
import User from '../User';
import { LogoImage } from '../../components/Images/imagesComponents';

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  gap: '1rem',
  color: '#fff',
  height: 72,
  backgroundColor: 'var(--primary-gray)',
};

const logoStyle = {
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  color: '#fff',
};

const menuOptionsStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '3rem',
  color: '#fff',
  minHeight: '100%',
  maxHeight: '100%',
  textAlign: 'center',
  fontSize: '16px',
};

const Logo = () => {
  return (
    <Link to="/" style={logoStyle}>
      <LogoImage />
    </Link>
  );
};

const MenuOptions = () => {
  return (
    <div style={menuOptionsStyle}>
      <LinkWithoutDecoration redirectUrl="/help" text="Ajuda" />
      <LinkWithoutDecoration redirectUrl="/" text="Início" />
      <User />
    </div>
  );
};

const HeaderMenu = () => {
  return (
    <AntLayout.Header style={headerStyle}>
      <Logo />
      <MenuOptions />
    </AntLayout.Header>
  );
};

export default HeaderMenu;
