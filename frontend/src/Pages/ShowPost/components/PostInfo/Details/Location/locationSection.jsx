import { Box } from '@mui/material';
import { Img, Subtitulo } from '../../../../style';
import Map from '../../../Map';
import LocationCard from './locationCard/locationCard';
const postMapPlaceholderImage = require('../../../../../../img/placeholder.png');

const MapComponent = ({ post }) => {
  if (post.latlng) {
    return <Map post={post} />;
  }

  return <Img src={postMapPlaceholderImage} alt="img" />;
};

const LocationSection = ({ post }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '.5rem',
        padding: '1rem',
      }}
    >
      <Subtitulo>LOCAL E DATA:</Subtitulo>

      <MapComponent post={post} />

      <LocationCard
        locationDetailsData={{
          weather: post.weather,
          biome: post.biome,
          fitofisionomia: post.fitofisionomia,
          latlng: post.latlng,
          city: post.city,
          dateFound: post.dateFound,
        }}
      />
    </Box>
  );
};

export default LocationSection;
