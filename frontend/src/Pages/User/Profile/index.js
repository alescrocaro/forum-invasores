import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';

import animaliaIcon from '../../../img/animaliaIcon.svg';
import avatarImage from '../../../img/avatar.png';
import chromistaIcon from '../../../img/chromistaIcon.svg';
import commentIcon from '../../../img/commentIcon.svg';
import contestationIcon from '../../../img/contestationIcon.svg';
import fungiIcon from '../../../img/fungiIcon.svg';
import moneraIcon from '../../../img/moneraIcon.svg';
import plantaeIcon from '../../../img/plantaeIcon.svg';
import postIcon from '../../../img/postIcon.svg';
import protistaIcon from '../../../img/protistaIcon.svg';

import Container from '../../../components/Container';
import Layout from '../../../components/Layout';

import { Paper } from '@mui/material';

import './style.css';

const KingdomEnum = {
  animalia: 'animalia',
  protozoa: 'protozoa',
  plantae: 'plantae',
  bacteria: 'bacteria',
  fungi: 'fungi',
  chromista: 'chromista',
};

const KingdomColorsEnum = {
  [KingdomEnum.animalia]: '#c71700',
  [KingdomEnum.protozoa]: '#d1a400',
  [KingdomEnum.plantae]: '#04b500',
  [KingdomEnum.bacteria]: '#8f00d1',
  [KingdomEnum.fungi]: '#7a7a7a',
  [KingdomEnum.chromista]: '#00b5d1',
};

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [topKingdomPosts, setTopKingdomPosts] = useState({});
  const [topKingdomComments, setTopKingdomComments] = useState({});
  const [topKingdomContestations, setTopKingdomContestations] = useState({});
  const [contributionInfo, setContributionInfo] = useState({});
  const { id } = useParams();
  const [profilePicUrl, setProfilePicUrl] = useState('');

  async function getUser(id) {
    const { data } = await api.get(`users/${id}`);
    setProfileData(data.user);

    const response = await api
      .get(`/users/${id}/profile-pic`, {
        responseType: 'blob',
      })
      .catch(() => {
        console.error('Erro ao obter a imagem do perfil');
      });

    if (response?.data) {
      const imageUrl = URL.createObjectURL(response.data);
      setProfilePicUrl(imageUrl);
    }

    const { statistics } = data ?? {};

    setTopKingdomPosts({
      topKingdom: statistics?.topPostKingdom?.name ?? '',
      color: KingdomColorsEnum[statistics?.topPostKingdom?.name],
      count: statistics?.topPostKingdom?.count ?? 0,
    });

    setTopKingdomComments({
      topKingdom: statistics?.topCommentKingdom?.name ?? '',
      color: KingdomColorsEnum[statistics?.topCommentKingdom?.name],
      count: statistics?.topCommentKingdom?.count ?? 0,
    });

    setTopKingdomContestations({
      topKingdom: statistics?.topContestationKingdom?.name ?? '',
      color: KingdomColorsEnum[statistics?.topContestationKingdom?.name],
      count: statistics?.topContestationKingdom?.count ?? 0,
    });

    setContributionInfo({
      animalia: statistics?.animalia?.totalCount ?? 0,
      protozoa: statistics?.protozoa?.totalCount ?? 0,
      plantae: statistics?.plantae?.totalCount ?? 0,
      bacteria: statistics?.bacteria?.totalCount ?? 0,
      fungi: statistics?.fungi?.totalCount ?? 0,
      chromista: statistics?.chromista?.totalCount ?? 0,
    });
  }

  const bio = profileData.bio !== '' ? profileData.bio : 'Sem descrição';

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await api.post(
        `/users/${id}/profile-picture?timestamp=${new Date().getTime()}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      let imagePath = response.data.profilePicture;
      setProfilePicUrl(`${process.env.REACT_APP_BASE_URL}${imagePath}`);

      setProfileData(prevData => ({
        ...prevData,
        profilePicture: imagePath,
      }));
    } catch (error) {
      console.error('Erro ao enviar a foto de perfil');
    }
  };

  useEffect(() => {
    getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout>
      <Container container className="container">
        <div className="styledCard main">
          <div className="avatar-container">
            <img
              className="styledAvatar"
              key={profilePicUrl}
              src={profilePicUrl || avatarImage}
              alt="avatar"
            />
            <label htmlFor="upload-button-file" className="avatar-overlay">
              Upload Foto
            </label>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-button-file"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="styledDiv">
            Nome:
            <Paper className="styledPaper">{profileData.name}</Paper>
          </div>
          <div className="styledDiv">
            Bio:
            <Paper className="styledPaper" placeholder="Insira uma descrição">
              {bio}
            </Paper>
          </div>
        </div>
        <div className="styledCard infos">
          <div className="contentDiv">
            <h3>CONTRIBUIÇÕES PARA REINOS:</h3>
            <div className="contentLine">
              <img className="icon" src={postIcon} alt="post icon" />
              <h4>POSTS:</h4>
              <h4
                className="topContribution"
                style={{ color: topKingdomPosts?.color }}
              >
                {topKingdomPosts?.topKingdom} ({topKingdomPosts?.count})
              </h4>
            </div>
            <div className="contentLine">
              <img className="icon" src={commentIcon} alt="comment icon" />
              <h4>COMENTÁRIOS:</h4>
              <h4
                className="topContribution"
                style={{ color: topKingdomComments?.color }}
              >
                {topKingdomComments?.topKingdom} ({topKingdomComments?.count})
              </h4>
            </div>
            <div className="contentLine">
              <img
                className="icon"
                src={contestationIcon}
                alt="contestation icon"
              />
              <h4>CONTESTAÇÕES:</h4>
              <h4
                className="topContribution"
                style={{ color: topKingdomContestations?.color }}
              >
                {topKingdomContestations?.topKingdom} (
                {topKingdomContestations?.count})
              </h4>
            </div>
            <h3>ESPECIALIDADES:</h3>
            <div className="contentLine">
              <img className="icon" src={animaliaIcon} alt="animalia icon" />
              <h4 style={{ color: '#c71700' }}>ANIMALIA:</h4>
              <h4 className="topContribution">
                {contributionInfo?.animalia ?? 0} contribuições
              </h4>
            </div>
            <div className="contentLine">
              <img
                className="iconProtista"
                src={protistaIcon}
                alt="protista icon"
              />
              <h4 style={{ color: '#d1a400' }}>PROTOZOA:</h4>
              <h4 className="topContribution">
                {contributionInfo?.protozoa ?? 0} contribuições
              </h4>
            </div>
            <div className="contentLine">
              <img className="icon" src={plantaeIcon} alt="plantae icon" />
              <h4 style={{ color: '#04b500' }}>PLANTAE:</h4>
              <h4 className="topContribution">
                {contributionInfo?.plantae ?? 0} contribuições
              </h4>
            </div>
            <div className="contentLine">
              <img className="icon" src={moneraIcon} alt="monera icon" />
              <h4 style={{ color: '#8f00d1' }}>MONERA:</h4>
              <h4 className="topContribution">
                {contributionInfo?.monera ?? 0} contribuições
              </h4>
            </div>
            <div className="contentLine">
              <img className="icon" src={fungiIcon} alt="fungi icon" />
              <h4 style={{ color: '#7a7a7a' }}>FUNGI:</h4>
              <h4 className="topContribution">
                {contributionInfo?.fungi ?? 0} contribuições
              </h4>
            </div>
            <div className="contentLine">
              <img className="icon" src={chromistaIcon} alt="chromista icon" />
              <h4 style={{ color: '#00b5d1' }}>CHROMISTA:</h4>
              <h4 className="topContribution">
                {contributionInfo?.chromista ?? 0} contribuições
              </h4>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
