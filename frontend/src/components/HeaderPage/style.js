import styled from 'styled-components';

export const DescricaoG = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9em;
  color: #14aa6b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DescricaoB = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-weigth: 600;
  font-size: 0.8em;
  color: #3d3d3d;
  letter-spacing: -0.05em;
`;

export const Filters = styled.div`
  background-color: #fafafa;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const FiltersContent = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  @media ( max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ( max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`

export const OpenFilterButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: white;

  &:hover{
    color: #14aa6b;
  }

  &inverter{
    background: red;
  }
`