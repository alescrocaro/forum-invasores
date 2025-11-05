import { Card, Divider } from '@mui/material';
import DescriptionSection from './Description/descriptionSection';
import DetailsSection from './Details/detailsSection';
import TagsSection from './TagsSection/tagsSection';

const PostInfo = ({ post }) => {
  if (!post) return 'Carregando...';
  console.log({post})

  return (
    <Card
      sx={{
        backgroundColor: '#f0f0f0',
      }}
      className="w-full h-fit grid mb-1.5"
    >
      <DetailsSection post={post} />

      <Divider variant="middle" />

      <DescriptionSection text={post.description} />

      <Divider variant="middle" />

      <TagsSection tags={post.tags} />
    </Card>
  );
};

export default PostInfo;
