import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
// import EXIF from 'exif-js';
import { useCreatePost } from '../../../../Context/CreatePostContext';

//components
import TagsInput from "../TagsInput";
import CssTextField from '../CssTextField';
import { Titulo, Subtitulo } from './style';
import { Button } from '@mui/material/';

//date picker
import { DatePicker} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function StepDescricao(props) {
    const { formData, updateFormData } = useCreatePost();
    const [ tags, setTags ] = useState(formData.tags || []);

    //botao de criar post
    const formik = useFormik({
        initialValues: {
            title: formData.title || '',
            description: formData.description || '',
            dateEncounter: formData.dateFound || new Date(),
            currentHashtag: ''
        },
        validationSchema: yup.object({
            title: yup.string('Espécie + Bioma').required('Campo obrigatório'),
            description: yup.string('Descrição').required('Campo obrigatório'),
            dateEncounter: yup.date().required('Campo obrigatório'),
            currentHashtag: yup.string('currentHashtag')
        }),
        onSubmit: (values) => {
            if(imgFile?.length < 1) return alert('ERRO: Você deve anexar ao menos uma foto!');

            updateFormData({
                title: values.title,
                description: values.description,
                dateFound: values.dateEncounter,
                tags: tags,
                images: imgFile
            });
            props.nextStep();
        }
    });


    //componente
    return (
        <form onSubmit={formik.handleSubmit}>

            <div style={{
                display: 'grid',
                gap: '16px',
                width: '100%',
            }}>
                
                <div>
                <Titulo>TÍTULO:</Titulo>
                <Subtitulo>Dê-nos uma breve apresentação sobre o que você observou!</Subtitulo>
                <CssTextField
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    label={'Título'}
                    fullWidth
                />
                </div>

                <div style={{
                    display: 'grid',
                    gap: '16px',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                
                    <div>
                    <Titulo>TAGS:</Titulo>
                    <Subtitulo>Esta observação está relacionada a outras?</Subtitulo>
                    <TagsInput
                        selectedTags={(i) => setTags(i)}
                        variant="outlined"
                        id="currentHashtag"
                        name="currentHashtag"
                        placeholder="Insira a tag desejada e aperte Enter."
                        label="Tags"
                        fullWidth
                        sx={{maxWidth: '100%'}}
                        />
                    </div>

                    <div>
                    <Titulo>OBSERVADO EM:</Titulo>
                    <Subtitulo>Quando você encontrou o espécime?</Subtitulo>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Observado em"
                            id="dateEncounter"
                            name="dateEncounter"
                            backgroundColor="#fff"
                            value={formik.values.dateEncounter}
                            onChange={(value) => {formik.setFieldValue('dateEncounter', value);}}
                            renderInput={(params) => (
                                <CssTextField
                                    {...params}
                                    helperText={formik.touched.dateEncounter && formik.errors.dateEncounter}
                                    error={formik.touched.dateEncounter && Boolean(formik.errors.dateEncounter)}
                                    fullWidth
                                />
                            )}
                        />
                    </LocalizationProvider>
                    </div>
                </div>

                <div>
                <Titulo>DESCRIÇÃO:</Titulo>
                <Subtitulo>Conte-nos mais sobre como você encontrou o espécime e como é o local!</Subtitulo>
                <CssTextField
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    label={'Descrição'}
                    multiline
                    rows={5}
                    fullWidth
                />
                </div>
                
                <div style={{marginLeft: 'auto'}}>
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
            </div>
        </form>
    );
}