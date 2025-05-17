import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from '@mui/material/';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useToken } from '../../Context/AuthContext';
import Container from '../../components/Container';
import HeaderPage from '../../components/HeaderPage';
import Layout from '../../components/Layout';
import { api } from '../../services/api';
import PostController from '../../structures/controllers/post';
import PostInfo from './components/PostInfo/postInfo';
import { Descricao, Subsubtitulo, Subtitulo } from './style';

const Post = () => {
  const { id } = useParams();
  const { user } = useToken();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  async function getPost(id) {
    PostController.getPost({ id }).then(data => {
      setPost(data);
    });
  }

  async function getComments(id) {
    const { data } = await api.get(`posts/${id}/comments`);
    setComments(data);
    return data;
  }

  const resolveContestation = commentId => {
    api
      .post(`/resolve-contestation`, {
        commentId: commentId,
        userId: user.id,
      })
      .then(() => {
        getComments(post.id);
      })
      .catch(error => {
        console.log('erro: ', error);
      });
  };

  const scheme = yup.object({
    description: yup.string('Comentário').required('Campo obrigatório').trim(),
    type: yup.string('Tipo').required('Campo obrigatório'),
    userName: yup.string('Nome').required('Campo obrigatório'),
  });

  const formik = useFormik({
    validationSchema: scheme,
    initialValues: {
      userName: 'userName',
      description: '',
      type: '',
      postId: id,
    },

    onSubmit: async values => {
      const { userName, description, type } = values;

      const postId = id;
      try {
        await api.post(`/posts/${postId}/comments`, {
          userName,
          description,
          type,
          userId: user.id,
        });
        getComments(id);
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const username = post.User ? post.User.name : 'user';

  useEffect(() => {
    getPost(id);
    getComments(id);
  }, [id]);

  return (
    <Layout>
      <Container
        container
        sx={{
          display: 'grid',
          alignItems: 'start',
          gap: '2vh',
          margin: '2vh 0',
        }}
      >
        <HeaderPage
          title={post.title}
          userName={username}
          dateFound={post.dateFound}
        />

        <PostInfo post={post} />

        {/* card da comunidade */}
        <Card
          sx={{
            width: '100%',
            height: 'fit-content',
            backgroundColor: '#f0f0f0',
            display: 'grid',
            marginBottom: '5px',
          }}
        >
          {/* Box da listagem de comentários */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: '.15rem',
              padding: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Subtitulo>COMUNIDADE:</Subtitulo>
            </Box>
          </Box>

          {/* Box de um comentário  */}
          {comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                padding: '1rem',
                rowGap: '.3rem',
                backgroundColor:
                  comment.type === 'CONTESTATION'
                    ? comment.resolvedAmount
                      ? 'rgba(0, 255, 0, 0.1)'
                      : 'rgba(255, 0, 0, 0.2)'
                    : '',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" color="black">
                  {comment.User == null ? 'user' : comment.User.name}
                </Typography>
                {comment.type === 'CONTESTATION' && (
                  <div>
                    {!comment.resolvedAmount && user && (
                      <Button
                        disabled={comment.UserResolvedContestations?.some(
                          element => element.userId === user.id
                        )}
                        type="submit"
                        size="small"
                        variant="outlined"
                        style={{ color: 'black', borderColor: '#14aa6b' }}
                        onClick={() => resolveContestation(comment.id)}
                      >
                        Marcar como resolvido
                      </Button>
                    )}
                    {comment.UserResolvedContestations?.length > 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled
                        size="small"
                      >
                        Contestação resolvida
                      </Button>
                    )}
                  </div>
                )}
              </Box>
              {comment.type === 'COMMENT' && (
                <Descricao>{comment.description}</Descricao>
              )}
              {comment.type === 'CONTESTATION' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Descricao>{comment.description}</Descricao>
                </Box>
              )}
              <Divider />
            </Box>
          ))}

          {/* Box de postagem de comentário */}
          {user && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <Subsubtitulo>ESCREVER COMENTÁRIO:</Subsubtitulo>
              <form component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    marginTop: '10px',
                  }}
                  fullWidth
                  multiline
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  label={'Seu comentário'}
                />
                {/* Box de botões */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '5px',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{
                      margin: '0 5px',
                    }}
                    onClick={() => formik.setFieldValue('type', 'CONTESTATION')}
                  >
                    Contestar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => formik.setFieldValue('type', 'COMMENT')}
                    style={{ backgroundColor: '#14aa6b' }}
                  >
                    Comentar
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Card>
      </Container>
    </Layout>
  );
};

export default Post;
