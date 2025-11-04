import styled from 'styled-components';
import { CardContent } from '@mui/material';

export const BannerImage = styled.img`
  height: 100%;
  width: 100%;
  object-position: 50% 50%;
  object-fit: cover;
  overflow: hidden;
`;

export const StyledCardDescription = styled(CardContent)`
  width: 95%;
  align-items: start;
  display: grid;
  grid-template-columns: 45% 47.5%;
  gap: 2.5%;
  overflow: hidden;
  padding: 0 !important;
  margin-top: 10px;

  > :nth-child(2) {
    border-style: none none none solid;
    border-width: 1px;
    border-color: #ccc;
    padding-left: 5%;
  }
`;

export const DescricaoB = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-weigth: 600;
  color: #3d3d3d;
  letter-spacing: -0.05em;
`;

