import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import LocationSection from './Location/locationSection';
import SpecimenSection from './Specimen/specimenSection';

const DetailsSection = ({ post }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(post.Images);
  }, [post.Images]);

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 items-start mb-2">
      <SpecimenSection post={post} images={images} setImages={setImages} />
      <LocationSection post={post} />
    </Box>
  );
};

export default DetailsSection;
