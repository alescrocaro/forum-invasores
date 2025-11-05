import React, { createContext, useState, useContext } from 'react';

const CreatePostContext = createContext();

export function CreatePostProvider({ children }) {
  const [formData, setFormData] = useState({
    // StepDescricao
    images: [],
    title: '',
    description: '',
    dateFound: new Date(),
    tags: [],

    // StepEspecime
    kingdom: '',
    phylum: '',
    className: '',
    order: '',
    family: '',
    genus: '',
    specie: '',

    // StepLocal
    biome: '',
    fitofisionomia: '',
    weather: '',
    country: '',
    city: '',
    latlng: null,

    // EXIF
    exifData: null
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetFormData = () => {
    setFormData({
      images: [],
      title: '',
      description: '',
      dateFound: new Date(),
      tags: [],
      kingdom: '',
      phylum: '',
      className: '',
      order: '',
      family: '',
      genus: '',
      specie: '',
      biome: '',
      fitofisionomia: '',
      weather: '',
      country: '',
      city: '',
      latlng: null,
      exifData: null
    });
  };

  return (
    <CreatePostContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </CreatePostContext.Provider>
  );
}

export function useCreatePost() {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error('useCreatePost must be used within a CreatePostProvider');
  }
  return context;
} 