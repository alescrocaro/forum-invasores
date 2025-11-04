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

const Logo = () => {
  return (
    <Link to="/" style={logoStyle}>
      <LogoImage />
    </Link>
  );
};

const MenuOptions = () => {
  return (
    <div className="flex  items-center justify-end gap-3 text-white min-h-full max-h-full text-center text-[16px] sm:gap-5">
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
