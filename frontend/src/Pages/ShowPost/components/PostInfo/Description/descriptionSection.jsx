import { Box, Paper } from '@mui/material';
import { Descricao, Subtitulo } from '../../../style';

const DescriptionSection = ({ text }) => {
  return (
    <Box
      className="description"
      sx={{
        display: 'grid',
        gap: '.5rem',
        padding: '1rem',
      }}
    >
      <Subtitulo>DESCRIÇÃO DO HABITAT:</Subtitulo>
      <Paper elevation={0}>
        <Descricao>{text}</Descricao>
      </Paper>
    </Box>
  );
};

export default DescriptionSection;
