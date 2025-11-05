import { Autocomplete, Box, Button } from '@mui/material/';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useCreatePost } from '../../../../Context/CreatePostContext';
import { BIOMAS, FITOFISIONOMIAS, CLIMAS } from '../../../../constants/environment';
import CssTextField from '../CssTextField';
import Map from '../Map';
import { Subtitulo, Titulo } from './style';


const validateLatlng = (raw) => {
  if (raw === '' || raw === null || raw === undefined) return '';

  let str = String(raw);

  // 1) Mantém apenas números, '-', '.' e ','
  str = str.replace(/[^0-9.,-]+/g, '');

  // 2) Garante que só exista 1 '-' e, se existir, ele fique somente no começo
  if (str.includes('-')) {
    const isNegative = str.trim().startsWith('-');
    str = str.replace(/-/g, ''); // remove todos
    if (isNegative) str = '-' + str;
  }

  // 3) Normaliza vírgula para ponto (somos BR mas o JS quer ponto)
  //    Depois disso, vamos tratar os pontos.
  str = str.replace(/,/g, '.');

  // 4) Garante no máximo um ponto decimal
  const sign = str.startsWith('-') ? '-' : '';
  let body = sign ? str.slice(1) : str;

  const parts = body.split('.');
  if (parts.length > 1) {
    // junta tudo depois do primeiro ponto em um só bloco
    body = parts[0] + '.' + parts.slice(1).join('');
  }

  return sign + body;
};


export default function StepLocal(props) {
    const { formData, updateFormData } = useCreatePost();
    
    //mapa
    //hook para pegar coordenadas no mapa
    const [latlng, setLatlng] = useState(formData.latlng || null);
    const latlngControls = {};
    latlngControls.changeLatlng = (coords) => {setLatlng(coords)};
    latlngControls.getLatlng = () => {return latlng};

    const changeLat = (l) => {
        setLatlng({
            lat: validateLatlng(l.target.value),
            lng: latlng?.lng || 0, 
        });
    }
        
    const changeLng = (l) => {
        setLatlng({
            lat: latlng?.lat || 0, 
            lng: validateLatlng(l.target.value),
        });
    }

    //botao de criar post
    const formik = useFormik({
        initialValues: {
          biomeName: formData.biome || '',
          fitofisionomia: formData.fitofisionomia || '',
          climateType: formData.weather || '',
          state: formData.state || '',
          city: formData.city || '',
          country: formData.country || '',
        },
        validationSchema: yup.object({
            biomeName: yup.string('Nome do Bioma').required('Campo obrigatório'),
            fitofisionomia: yup.string('Fitofisionomia').required('Campo obrigatório'),
            climateType: yup.string('Tipo de clima').required('Campo obrigatório'),
            city: yup.string('Cidade').required('Campo obrigatório'),
            state: yup.string('Estado').required('Campo obrigatório'),
            country: yup.string('País').required('Campo obrigatório'),
        }),
        onSubmit: (values) => {
            //adicionar checar mapa aqui
            if(!latlng) return alert('ERRO: Você deve anexar uma geolização!');

            updateFormData({
                biome: values.biomeName,
                fitofisionomia: values.fitofisionomia,
                weather: values.climateType,
                country: values.country,
                state: values.state,
                city: values.city,
                latlng: latlng,
            });
            props.nextStep();
        }
    });

    //botao voltar
    const prevStepHandler = () => {
        if(window.confirm("Ao voltar, todos os dados inseridos serão perdidos, deseja voltar mesmo assim?")){
            props.prevStep();
        }
    }

    // Atualiza coordenadas quando recebe dados EXIF
    useEffect(() => {
      if (props.exifData?.coordinates) {
        setLatlng(props.exifData.coordinates);
      }
    }, [props.exifData]);

    // Atualiza as coordenadas quando a localizacao no form mudar
    useEffect(() => {
      console.log(formData.latlng)
        if (formData.latlng) {
            setLatlng(formData.latlng);
        }
    }, [formData.latlng]);

    //componente
    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                {/*lado direito*/}
                <div>
                    <Titulo>GEOLOCALIZAÇÃO:</Titulo>
                    <Subtitulo>Aonde você encontrou este espécime? Clique no mapa ou escreva a Latitude e Longitude nos campos abaixo!</Subtitulo>
                    <Map latlngControls={latlngControls}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px'}}>
                        <CssTextField
                            id='latitude'
                            label={'Latitude'}
                            value={latlng?.lat || ''}
                            onChange={changeLat}
                            style={{width: '100%'}}
                        />
                        <CssTextField
                            id='longitude'
                            label={'Longitude'}
                            value={latlng?.lng || ''}
                            onChange={changeLng}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>{/*end lado esquerdo*/}

                {/*lado direito*/}
                <div>
                    {/* Seção: ecossistema*/}
                    <div>
                        <Titulo>ECOSSISTEMA:</Titulo>
                        <Subtitulo>Forneça alguns detalhes do ecossistema onde o espécime foi encontrado, assim saberemos como ajudar!</Subtitulo>

                        <div style={{display: 'grid', gap: '16px'}}>
                            <Autocomplete
                                id="biomeName"
                                autoHighlight
                                value={formik.values.biomeName || null}
                                onChange={(event, newValue) => {if(newValue) formik.setFieldValue('biomeName', newValue.label);}}
                                isOptionEqualToValue={(option, value) => value}
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                options={BIOMAS}

                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.label}
                                    </Box>
                                )}

                                renderInput={(params) => (
                                    <CssTextField
                                        {...params}
                                        label="Bioma"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        error={formik.touched.biomeName && Boolean(formik.errors.biomeName)}
                                        helperText={formik.touched.biomeName && formik.errors.biomeName}
                                    />
                                )}
                            />
                            
                            <Autocomplete
                                id="fitofisionomia"
                                autoHighlight
                                value={formik.values.fitofisionomia || null}
                                onChange={(event, newValue) => {if(newValue) formik.setFieldValue('fitofisionomia', newValue.label);}}
                                isOptionEqualToValue={(option, value) => value}
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                options={FITOFISIONOMIAS}

                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.label}
                                    </Box>
                                )}

                                renderInput={(params) => (
                                    <CssTextField
                                        {...params}
                                        label="Fitofisionomia"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        error={formik.touched.fitofisionomia && Boolean(formik.errors.fitofisionomia)}
                                        helperText={formik.touched.fitofisionomia && formik.errors.fitofisionomia}
                                    />
                                )}
                            />
                            
                            <Autocomplete
                                id="climateType"
                                autoHighlight
                                value={formik.values.climateType || null}
                                onChange={(event, newValue) => {if(newValue) formik.setFieldValue('climateType', newValue.label);}}
                                isOptionEqualToValue={(option, value) => value}
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                options={CLIMAS}

                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.label}
                                    </Box>
                                )}

                                renderInput={(params) => (
                                    <CssTextField
                                        {...params}
                                        label="Clima"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        error={formik.touched.climateType && Boolean(formik.errors.climateType)}
                                        helperText={formik.touched.climateType && formik.errors.climateType}
                                    />
                                )}
                            />
                        </div>
                    </div> {/*end secao taxonomia*/}
                
                    {/*secao local*/}
                    <div style={{marginTop: '32px'}}>
                        <Titulo>LOCAL:</Titulo>
                        <Subtitulo>Forneça algumas informações sobre a região, isso ajudará nas pesquisas!</Subtitulo>
                        <div style={{display: 'grid', gap: '16px'}}>
                            <CssTextField
                                label={'Município'}
                                id="city"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                fullWidth
                            />

                            <CssTextField
                                label={'Estado'}
                                id="state"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                fullWidth
                            />

                            <CssTextField
                                label={'País'}
                                id="country"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                                fullWidth
                            />
                        </div>
                    </div> {/*end municipalidades*/}
                </div> {/*end lado direito*/}
            </div>{/*end conteudo*/}
                
            <div style={{width: '100%', marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'right'}}>
                <Button
                    onClick={(e) => {prevStepHandler()}}
                    variant="outlined"
                    color="success"
                    sx={{ fontWeight: 'bold', width: 'fit-content'}}
                >
                    Voltar
                </Button>
                <Button
                    onSubmit={(e) => {e.preventDefault();}}
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ fontWeight: 'bold', width: 'fit-content'}}
                >
                    Enviar
                </Button>
            </div>
        </form>
    );
}

// Using constants from environment.js