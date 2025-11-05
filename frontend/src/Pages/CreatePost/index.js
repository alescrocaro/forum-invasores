import {
  Card,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material/';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/AuthContext';
import { useCreatePost } from '../../Context/CreatePostContext';
import Container from '../../components/Container';
import HeaderPage from '../../components/HeaderPage';
import Layout from '../../components/Layout';
import { api } from '../../services/api';
import StepDescricao from './components/StepDescricao';
import StepEspecime from './components/StepEspecime';
import StepLocal from './components/StepLocal';

export default function CreatePost() {
  const { user } = useToken();
  const navigate = useNavigate();
  const { formData, updateFormData, resetFormData } = useCreatePost();
  const [activeStep, setActiveStep] = useState(0);

  const createPost = async () => {
    try {
      const res = await api.post('/posts', {
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        dateFound: formData.dateFound,

        contested: 0,
        userId: user.id,
        userName: user.name,

        kingdom: formData.kingdom,
        phylum: formData.phylum ?? null,
        className: formData.className ?? null,
        order: formData.order ?? null,
        family: formData.family ?? null,
        genus: formData.genus ?? null,
        specie: formData.specie ?? null,
        imgUrl: '',

        biome: formData.biome,
        fitofisionomia: formData.fitofisionomia,
        weather: formData.weather,
        country: formData.country,
        city: formData.city,
        latlng: formData.latlng,
      });

      //upload das imgs
      if (formData.images?.length > 0) {
        const formDataUpload = new FormData();

        formData.images.forEach(element => {
          formDataUpload.append('specieImages', element.currentFile);
        });

        api.post(`/posts/${res.data}/image`, formDataUpload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      //ir pra pagina do post
      navigate(`/posts/${res.data}`);
      resetFormData();
    } catch (e) {
      alert('ERRO: Algo inexperado aconteceu, tente novamente mais tarde! :(');
      setActiveStep(2);
    }
  };

  const nextStep = (stepData) => {
    updateFormData(stepData);
    setActiveStep(activeStep + 1);
  };

  const prevStep = (stepData) => {
    if (activeStep <= 0) return;
    updateFormData(stepData);
    setActiveStep(activeStep - 1);
  };

  //enviar requisição pra api
  useEffect(() => {
    if (activeStep > 2) {
      createPost();
    }
  }, [activeStep]);

  return (
    <Layout>
      <Container container>
        <HeaderPage title="ADICIONANDO NOVA OBSERVAÇÃO:" />

        <Card
          sx={{
            width: '100%',
            height: 'fit-content',
            marginBottom: '5px',
            padding: '16px',
            backgroundColor: '#f0f0f0',
            display: 'block',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step key={1}>
              <StepLabel>
                <p style={{ marginTop: '-10px' }}>Fotos e Descrição</p>
              </StepLabel>
            </Step>
            <Step key={2}>
              <StepLabel>
                <p style={{ marginTop: '-10px' }}>Espécime</p>
              </StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>
                <p style={{ marginTop: '-10px' }}>Local</p>
              </StepLabel>
            </Step>
          </Stepper>

          {activeStep <= 0 && <StepDescricao nextStep={nextStep} />}
          {activeStep === 1 && (
            <StepEspecime nextStep={nextStep} prevStep={prevStep} />
          )}
          {activeStep === 2 && (
            <StepLocal nextStep={nextStep} prevStep={prevStep} />
          )}
          {activeStep > 2 && (
            <div
              style={{
                width: '100%',
                display: 'block',
                padding: '32px 0',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress color="success" sx={{ margin: '0 auto' }} />
              </div>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#333',
                  textAlign: 'center',
                }}
              >
                Enviando...
              </p>
            </div>
          )}
        </Card>
      </Container>
    </Layout>
  );
}
