const logoImage = require('../../img/logo.png');
// TODO: comprimir imagens

export const LogoImage = () => {
  return (
    <img
      src={logoImage}
      alt="Logo invasores. Contém uma imagem de uma planta e um peixe juntos, seguidos pelo texto 'Invasores'"
    />
  );
};
