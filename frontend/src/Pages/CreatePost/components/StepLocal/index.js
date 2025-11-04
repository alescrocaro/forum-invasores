import { Autocomplete, Box, Button } from '@mui/material/';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useCreatePost } from '../../../../Context/CreatePostContext';
import CssTextField from '../CssTextField';
import Map from '../Map';
import { Subtitulo, Titulo } from './style';


const validateLatlng = (str) => {    
    //remove all letters and special char except . and - 
    str = str.replace(/[^\d.]+/g, '');
    
    //remove all . but the first
    str = str.replace(/(?<=(.*\..*))\./gm, '');
    
    //remove all - but in the first char
    if(str.charAt(0) === '-') str = '-' + str.replace(/-/g, '');
    else str = str.replace(/-/g, '');
    
    //change all -. or ^. to -0.
    str = str.replace(/((?<=-)\.|(?<=^)\.)/g, '0.');

    // //change all 0+. or -0+.  to single 0
    // str = str.replace(/((?<=-)|(?<=^))0+\./g, '0.');
    return str;
}

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
          climateType: formData.weather || '',
          state: formData.state || '',
          city: formData.city || '',
          country: formData.country || '',
        },
        validationSchema: yup.object({
            biomeName: yup.string('Nome do Bioma').required('Campo obrigatório'),
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
                                options={biomas}

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
                                id="climateType"
                                autoHighlight
                                value={formik.values.climateType || null}
                                onChange={(event, newValue) => {if(newValue) formik.setFieldValue('climateType', newValue.label);}}
                                isOptionEqualToValue={(option, value) => value}
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                options={climas}

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

//----------------------------------------------------------------
//arrays

const biomas = [
    {label: 'Biomas montanos'},
    {label: 'Caatinga'},
    {label: 'Campina'},
    {label: 'Campinarana'},
    {label: 'Campo (bioma)'},
    {label: 'Chaparral'},
    {label: 'Charneca'},
    {label: 'Deserto'},
    {label: 'Estepe'},
    {label: 'Floresta'},
    {label: 'Floresta do Congo'},
    {label: 'Florestas, bosques e matagais mediterrânicos'},
    {label: 'Frigana'},
    {label: 'Fynbos'},
    {label: 'Ilha do céu'},
    {label: 'Lavrado'},
    {label: 'Manguezal'},
    {label: 'Maquis'},
    {label: 'Mata Atlântica'},
    {label: 'Mata dos cocais'},
    {label: 'Mata de Cipó'},
    {label: 'Matagal'},
    {label: 'Pampa'},
    {label: 'Pantanal'},
    {label: 'Pastagens e matagais de montanha'},
    {label: 'Paul (ecossistema)'},
    {label: 'Pradarias e savanas inundadas'},
    {label: 'Puszta'},
    {label: 'Restinga'},
    {label: 'Restinga de Massambaba'},
    {label: 'Rupununi Savannah'},
    {label: 'Savana'},
    {label: 'Selva'},
    {label: 'Serenguéti'},
    {label: 'Taiga'},
    {label: 'Vegetação litorânea'},
];

const climas = [
    {label: 'Af - Clima Equatorial'},
    {label: 'Am - Clima de Monção'},
    {label: 'AwAs - Clima de Savana'},
    {label: 'BWh - Clima Árido Quente'},
    {label: 'BWk - Clima Árido Frio'},
    {label: 'BSh - Clima Semiárido Quente'},
    {label: 'BSk - Clima Semiárido Frio'},
    {label: 'Cfa - Clima Subtropical Úmido'},
    {label: 'Cfb - Clima Oceânico Temperado'},
    {label: 'Cfc - Clima Oceânico Subpolar'},
    {label: 'Cwa - Clima Subtropical Úmido'},
    {label: 'Cwb - Clima Subtropical de Altitude'},
    {label: 'Cwc - Clima Subtropical Frio de Altitude'},
    {label: 'Csa - Clima Mediterrânico de Verão Quente'},
    {label: 'Csb - Clima Mediterrânico de Verão Fresco'},
    {label: 'Csc - Clima Mediterrânico de Verão Frio'},
    {label: 'Dfa - Clima Continental Úmido de Verão Quente'},
    {label: 'Dfb - Clima Continental Úmido de Verão Fresco'},
    {label: 'Dfc - Clima Subártico sem Estação Seca'},
    {label: 'Dfd - Clima Subártico Extremamente Frio sem Estação Seca'},
    {label: 'Dwa - Clima Continental Úmido de Verão Quente Influenciado Pelas Monções'},
    {label: 'Dwb - Clima Continental Úmido de Verão Fresco Influenciado Pelas Monções'},
    {label: 'Dwc - Clima Subártico Influenciado Pelas Monções'},
    {label: 'Dwd - Clima Subártico Extremamente Frio Influenciado Pela Monções'},
    {label: 'Dsa - Clima Continental Úmido de Verão Quente com Influência Mediterrânea'},
    {label: 'Dsb - Clima Continental Úmido de Verão Fresco com Influência Mediterrânea'},
    {label: 'Dsc - Clima Subártico com Estação Seca'},
    {label: 'Dsd - Clima Subártico Extremamente Frio com Estação Seca'},
    {label: 'ET - Clima de Tundra'},
    {label: 'EF - Clima Glacial'},
];