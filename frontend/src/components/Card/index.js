import { Box, CardActionArea, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';

import { BannerImage, DescricaoB, StyledCardDescription } from './style.js';

const Subtitle = ({ children }) => {
  return (
    <h4 className="uppercase font-black text-green my-2 text-[16px]">
      {children}
    </h4>
  );
};
const Description = ({ label, value }) => {
  return (
    <div className="grid">
      <span className="text-xs text-green font-semibold">{label}</span>
      <span className="text-sm ">{value}</span>
    </div>
  );
};

export default function StyledCard({ post }) {
  const navigate = useNavigate();
  const date = new Date(post.dateFound);
  const url = post.Images?.length
    ? process.env.REACT_APP_BASE_URL + '/uploads/images/' + post.Images[0].url
    : require('../../img/placeholder.png');
  const username = post.User == null ? 'user' : `${post.User.name}`;

  return (
    <Box
      onClick={e => {
        navigate('/posts/' + post.id);
      }}
      style={{
        textDecoration: 'none',
      }}
      className="w-full m-0"
    >
      <Card
        sx={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fafafa',
        }}
        className="h-fit"
      >
        {/* card com tudo dentro */}
        <div className="grid grid-cols-1 sm:grid-cols-7 w-full h-full hover:cursor-pointer hover:bg-[#f0f0f0]">
          {/* imagem */}
          <BannerImage
            component="img"
            src={url}
            alt="img"
            className="col-span-1 sm:col-span-3 lg:col-span-2"
          />

          {/* conteudo */}
          <div className="w-full items-start overflow-hidden p-2 h-full col-span-1 sm:col-span-4 lg:col-span-5">
            {/* titulo do post */}
            <h2 className="font-bold text-green text-lg">{post.title}</h2>
            <span className="text-xs">
              Observado por <b>{username}</b> em{' '}
              <b>
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </b>
              .
            </span>

            {/* descriçao do post */}
            <StyledCardDescription>
              {/* especime */}
              <div>
                <Subtitle>ESPÉCIME:</Subtitle>

                <div className="grid gap-1">
                  <Description label={'Espécie:'} value={post.specie} />
                  <Description label={'Gênero:'} value={post.genus} />
                  <Description label={'Família:'} value={post.family} />
                </div>
              </div>

              {/* local */}
              <div>
                <Subtitle>LOCAL:</Subtitle>

                <div className="grid gap-1">
                  <Description label={'Bioma:'} value={post.biome} />
                  <Description label={'Clima:'} value={post.weather} />
                  <Description label={'Cidade:'} value={post.city} />
                </div>
              </div>
            </StyledCardDescription>

            <Box>
              {post.tags != null &&
                post.tags.map(element => (
                  <Chip
                    color="success"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                    key={element}
                    label={'#' + element}
                  />
                ))}
            </Box>
          </div>
        </div>
      </Card>
    </Box>
  );
}
