import styled from 'styled-components';

export const Mapa = styled.div`
  aspect-ratio: 16/10;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f2f2f2;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;