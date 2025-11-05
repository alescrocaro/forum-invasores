import { Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import createLocationDetailsColumns from './locationTableColumns';

const LocationCard = ({ locationDetailsData }) => {
  const [locationDetailsTableData, setLocationDetailsTableData] = useState([]);
  const locationDetailsColumns = createLocationDetailsColumns();

  useEffect(() => {
    setLocationDetailsTableData([
      {
        details: 'Clima',
        data: locationDetailsData.weather,
      },
      {
        details: 'Bioma',
        data: locationDetailsData.biome,
      },
      {
        details: 'Fitofisionomia',
        data: locationDetailsData.fitofisionomia || 'Não informado',
      },
      {
        details: 'Coord.',
        data: `Lat.: ${locationDetailsData.latlng?.coordinates[1].toFixed(
          5
        )}; Lng.: ${locationDetailsData.latlng?.coordinates[0].toFixed(5)}`,
      },
      {
        details: 'Cidade',
        data: locationDetailsData.city,
      },
      {
        details: 'Data',
        data: locationDetailsData.dateFound,
      },
    ]);
  }, [locationDetailsData]);

  return (
    <Card title="DETALHES">
      <Table
        size="small"
        pagination={false}
        columns={locationDetailsColumns}
        dataSource={locationDetailsTableData}
        rowKey={(_, index) => index}
      />
    </Card>
  );
};

export default LocationCard;
