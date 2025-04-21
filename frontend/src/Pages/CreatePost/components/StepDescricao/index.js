import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import EXIF from 'exif-js';
import { useCreatePost } from '../../../../Context/CreatePostContext';

//components
import TagsInput from "../TagsInput";
import CssTextField from '../CssTextField';
import { Titulo, Subtitulo } from './style';
import { Button } from '@mui/material/';
import UploadButton from '../UploadButton';

//date picker
import { DatePicker} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function StepDescricao(props) {
    const { formData, updateFormData } = useCreatePost();
    const [ tags, setTags ] = useState(formData.tags || []);
    const [imgFile, setImgFile] = useState(formData.images || []);

    const extractExifData = (file) => {
      return new Promise((resolve) => {
        EXIF.getData(file, function() {
          const exif = {
            date: EXIF.getTag(this, "DateTimeOriginal"),
            gps: {
              latitude: EXIF.getTag(this, "GPSLatitude"),
              longitude: EXIF.getTag(this, "GPSLongitude"),
              latitudeRef: EXIF.getTag(this, "GPSLatitudeRef"),
              longitudeRef: EXIF.getTag(this, "GPSLongitudeRef")
            }
          };
          
          resolve(exif);
        });
      });
    };

    // Converte coordenadas GPS EXIF para decimal
    const convertGPSToDecimal = (gpsData) => {
      if (!gpsData.latitude || !gpsData.longitude) return null;

      const lat = gpsData.latitude;
      const lng = gpsData.longitude;
      const latRef = gpsData.latitudeRef;
      const lngRef = gpsData.longitudeRef;

      const latDecimal = lat[0] + lat[1]/60 + lat[2]/3600;
      const lngDecimal = lng[0] + lng[1]/60 + lng[2]/3600;

      return {
        lat: latRef === 'S' ? -latDecimal : latDecimal,
        lng: lngRef === 'W' ? -lngDecimal : lngDecimal
      };
    };

    // Converte EXIF para formato Date
    const convertExifDate = (exifDate) => {
      if (!exifDate) return null;

      const [date, time] = exifDate.split(' ');
      const [year, month, day] = date.split(':');
      const [hour, minute, second] = time.split(':');

      return new Date(year, month - 1, day, hour, minute, second);
    };

    // Atualiza o estado das imagens e extrai metadados
    const handleImageChange = async (files) => {
      setImgFile(files);
        
      if (files.length > 0) {
        const lastImage = files[files.length - 1].currentFile;

        try {
          const exif = await extractExifData(lastImage);

          let newFormData = {
            ...formData,
            images: files
          };
          
          if (exif) {
            const date = convertExifDate(exif.date);
            const coordinates = convertGPSToDecimal(exif.gps);

            // Atualiza a data apenas se existe uma nova data válida
            if (date) {
              formik.setFieldValue('dateEncounter', date);
              newFormData.dateFound = date;
            }
            
            // Atualiza a localização apenas se existem novas coordenadas válidas
            if (coordinates) {
              newFormData.latlng = coordinates;
            }
          }
          
          // Atualiza o formulário com os novos dados
          updateFormData(newFormData);
        } catch (error) {
          console.error('Erro ao extrair metadados:', error);
        }
      }
    };

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

    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={{
                display: 'grid',
                gap: '16px',
                width: '100%',
            }}>
                <div>
                    <Titulo>FOTOS:</Titulo>
                    <Subtitulo>Mostre-nos algumas fotos do espécime, assim os membros podem ajudar!</Subtitulo>
                    <UploadButton 
                        label={'Imagem'} 
                        imgFile={imgFile} 
                        setImgFile={setImgFile}
                        onImageChange={handleImageChange}
                    />
                </div>

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