import React from 'react';

//components
import { ImgCard } from '../imgCard';
import { styled } from '@mui/material/styles';
import { Typography, Button} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { acceptedFileExtensions } from '../../../../structures/constants/file';

const StyledButton = styled(Button)(() => ({
  color: '#14aa6b',
  borderColor: '#14aa6b',
  width: '100%',
  height: '100px',
  gap: '5px',
  '&:hover': {
    backgroundColor: '#3d3d3d',
    borderColor: '#fff',
    color: '#fff',
  },
}));

export default function UploadButton({label, imgFile, setImgFile, onImageChange}) {
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!acceptedFileExtensions.includes(fileExtension)) {
      alert('ERRO: Não foi possível reconhecer a extensão da imagem. As extensões permitidas são .jpg, .png, .jpeg, .jpe, .jif, .web, .tiff e .tif!');
      return;
    }
    if(imgFile?.length >= 5 ) {
      alert('ERRO: Você atingiu o limite de imagens para esta observação!');
      return;
    }

    const newImgFile = [
      ...imgFile,
      {
        currentFile: file,
        id: Date.now()
      }
    ];
    
    setImgFile(newImgFile);
    if (onImageChange) {
      onImageChange(newImgFile);
    }
  };

  const handleOnDelete = (id) => {
    const newImgFile = imgFile.filter((element) => element.id !== id);
    setImgFile(newImgFile);
    if (onImageChange) {
      onImageChange(newImgFile);
    }
  };
  
  return (
    <div style={{display: 'grid', gap: '16px'}}>
      <StyledButton component="label" variant="outlined">
          <AddCircleOutlineOutlinedIcon fontSize='large'/>
          <Typography variant="h5" component="div" sx={{
            fontFamily: 'Montserrat, Sans Serif',
            fontWeight: '600',
            letterSpacing: '-0.05em',
          }}>
              {label}
          </Typography>
          <input
            onClick={(e) => e.target.value = null}
            onChange={handleOnChange}
            type="file"
            hidden
          />
      </StyledButton>
      
      <div>
        <Typography variant="p" component="div" sx={{
          fontFamily: 'Montserrat, Sans Serif',
            letterSpacing: '-0.05em',
            fontWeight: '600',
            color: '#333'
          }}>
            Fotos carregadas:
          </Typography>
        
        { imgFile?.length > 0 ?
          imgFile.map((element, index) => {
            return (<ImgCard
              handleOnDelete={handleOnDelete}
              key={index}
              id={element.id}
              imgName={element.currentFile.name}
            />)
          })
          :
          <Typography variant="p" component="div" sx={{
            fontFamily: 'Montserrat, Sans Serif',
            letterSpacing: '-0.05em',
            fontWeight: '500',
            color: 'red',
            fontSize: '.8em',
            marginTop: '5px'
          }}>
            ⚠️ Você deve anexar pelo menos uma foto!
          </Typography>
        }
      </div>
    </div>
  );
}
