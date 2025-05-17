import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useCreatePost } from '../../../../Context/CreatePostContext';

//components
import CssTextField from '../CssTextField';
import { Titulo, Subtitulo } from './style';
import { Button, MenuItem } from '@mui/material/';

export default function StepEspecime(props) {
    const { formData, updateFormData } = useCreatePost();

    //yup conditional validation
    const conditional = {
        is: (value) => !!value,
        then: yup.string().required('Campo obrigatório.')
    };

    const formik = useFormik({
        initialValues: {
            specieKingdom: formData.kingdom || '',
            specieDivision: formData.phylum || '',
            specieClass: formData.className || '',
            specieOrder: formData.order || '',
            specieFamily: formData.family || '',
            specieGenre: formData.genus || '',
            specieName: formData.specie || '',
            description: formData.description || '',
        },
        validationSchema: yup.object({
            specieKingdom: yup.string('Reino').required('Campo obrigatório'),
            specieDivision: yup.string('Filo').when('specieClass', conditional),
            specieClass: yup.string('Classe').when('specieOrder', conditional),
            specieOrder: yup.string('Ordem').when('specieFamily', conditional),
            specieFamily: yup.string('Família').when(['specieGenre', 'specieName'], conditional),
            specieGenre: yup.string('Gênero').when('specieName', conditional),
            specieName: yup.string('Espécie'),
            description: yup.string('Descrição').required('Campo obrigatório'),
        }),
        onSubmit: (values) => {
            updateFormData({
                kingdom: values.specieKingdom,
                phylum: values.specieDivision,
                className: values.specieClass,
                order: values.specieOrder,
                family: values.specieFamily,
                genus: values.specieGenre,
                specie: values.specieName,
                description: values.description,
            });
            props.nextStep();
        }
    });

    //botao voltar
    const prevStepHandler = () => {
        if(window.confirm("Ao voltar, todos os dados inseridos serão perdidos, deseja voltar mesmo assim?")){
            props.prevStep();
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%',
            }}>
                <div>
                <Titulo>TAXONOMIA:</Titulo>
                <Subtitulo>Não se preocupe se não souber tudo, coloque as informações que você conhece e os membros lhe ajudarão!</Subtitulo>

                    <div style={{display: 'grid', gap: '16px'}}>
                        {/* Reino > Filo > Classe > Ordem > Familia > Genero > Espécie */}
                        <CssTextField
                            label={'Reino'}
                            id="specieKingdom"
                            name="specieKingdom"
                            value={formik.values.specieKingdom}
                            onChange={formik.handleChange}
                            error={formik.touched.specieKingdom && Boolean(formik.errors.specieKingdom)}
                            helperText={formik.touched.specieKingdom && formik.errors.specieKingdom}
                            fullWidth
                            select
                        >
                            <MenuItem key={'Animalia'} value={'Animalia'}>Animalia</MenuItem> 
                            <MenuItem key={'Bacteria'} value={'Bacteria'}>Bacteria</MenuItem> 
                            <MenuItem key={'Chromista'} value={'Chromista'}>Chromista</MenuItem> 
                            <MenuItem key={'Fungi'} value={'Fungi'}>Fungi</MenuItem> 
                            <MenuItem key={'Plantae'} value={'Plantae'}>Plantae</MenuItem> 
                            <MenuItem key={'Protozoa'} value={'Protozoa'}>Protozoa</MenuItem> 
                        </CssTextField>

                        <CssTextField
                            label={'Filo'}
                            id="specieDivision"
                            name="specieDivision"
                            value={formik.values.specieDivision}
                            onChange={formik.handleChange}
                            error={formik.touched.specieDivision && Boolean(formik.errors.specieDivision)}
                            helperText={formik.touched.specieDivision && formik.errors.specieDivision}
                            fullWidth
                        />

                        <CssTextField
                            label={'Classe'}
                            id="specieClass"
                            name="specieClass"
                            value={formik.values.specieClass}
                            onChange={formik.handleChange}
                            error={formik.touched.specieClass && Boolean(formik.errors.specieClass)}
                            helperText={formik.touched.specieClass && formik.errors.specieClass}
                            fullWidth
                        />

                        <CssTextField
                            label={'Ordem'}
                            id="specieOrder"
                            name="specieOrder"
                            value={formik.values.specieOrder}
                            onChange={formik.handleChange}
                            error={formik.touched.specieOrder && Boolean(formik.errors.specieOrder)}
                            helperText={formik.touched.specieOrder && formik.errors.specieOrder}
                            fullWidth
                        />

                        <CssTextField
                            label={'Familia'}
                            id="specieFamily"
                            name="specieFamily"
                            value={formik.values.specieFamily}
                            onChange={formik.handleChange}
                            error={formik.touched.specieFamily && Boolean(formik.errors.specieFamily)}
                            helperText={formik.touched.specieFamily && formik.errors.specieFamily}
                            fullWidth
                        />

                        <CssTextField
                            label={'Gênero'}
                            id="specieGenre"
                            name="specieGenre"
                            value={formik.values.specieGenre}
                            onChange={formik.handleChange}
                            error={formik.touched.specieGenre && Boolean(formik.errors.specieGenre)}
                            helperText={formik.touched.specieGenre && formik.errors.specieGenre}
                            fullWidth
                        />

                        <CssTextField
                            label={'Espécie'}
                            id="specieName"
                            name="specieName"
                            value={formik.values.specieName}
                            onChange={formik.handleChange}
                            error={formik.touched.specieName && Boolean(formik.errors.specieName)}
                            helperText={formik.touched.specieName && formik.errors.specieName}
                            fullWidth
                        />
                    </div>
                </div>

                <div>
                    <Titulo>HABITAT:</Titulo>
                    <Subtitulo>Conte-nos mais sobre o local onde você encontrou o espécime! Exemplo: terrestre urbano, terrestre rural, terrestre unidade de conservação, etc. Adicione também pontos de referência e uma descrição do local, como "gramado alto, floresta...".</Subtitulo>
                    <CssTextField
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        label={'Habitat'}
                        multiline
                        rows={5}
                        fullWidth
                    />
                </div>
            </div>
                
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
                Avançar
            </Button>
            </div>
        </form>
    );
}
