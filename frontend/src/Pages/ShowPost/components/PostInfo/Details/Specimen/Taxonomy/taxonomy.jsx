import { Button, Card, Form, Table } from 'antd';
import { useEffect, useState } from 'react';
import createTaxonomyColumns from './taxonomyTableColumns';
import PostController from '../../../../../../../structures/controllers/post';
import { useToken } from '../../../../../../../Context/AuthContext';

const Taxonomy = ({ post }) => {
  const [isUpdatingTaxonomy, setIsUpdatingTaxonomy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taxonomyData, setTaxonomyData] = useState(false);

  const [form] = Form.useForm();
  const { user } = useToken();

  const taxonomyColumns = createTaxonomyColumns({
    isUpdating: isUpdatingTaxonomy,
  });

  const renderTaxonomyExtraButton = () => {
    if (isUpdatingTaxonomy) {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="small"
            onClick={() => {
              setIsUpdatingTaxonomy(prev => !prev);
              form.resetFields();
            }}
          >
            Cancelar
          </Button>
          <Button
            size="small"
            onClick={() => {
              setIsUpdatingTaxonomy(prev => !prev);
              form.submit();
            }}
            disabled={isLoading}
            style={{
              backgroundColor: 'var(--primary-green)',
              color: 'white',
            }}
          >
            Salvar
          </Button>
        </div>
      );
    }

    return (
      <Button
        size="small"
        onClick={() => {
          setIsUpdatingTaxonomy(prev => !prev);
        }}
        disabled={isLoading}
      >
        Editar
      </Button>
    );
  };

  const handleUpdateTaxonomy = formValues => {
    setIsLoading(true);
    PostController.updateTaxonomy({ postId: post.id, values: formValues })
      .then(updatedTaxonomy => {
        form.setFieldsValue({ ...updatedTaxonomy });
        setTaxonomyData([
          { category: 'Reino', data: updatedTaxonomy.kingdom },
          { category: 'Filo', data: updatedTaxonomy.phylum },
          { category: 'Classe', data: updatedTaxonomy.className },
          { category: 'Ordem', data: updatedTaxonomy.order },
          { category: 'Família', data: updatedTaxonomy.family },
          { category: 'Gênero', data: updatedTaxonomy.genus },
          { category: 'Espécie', data: updatedTaxonomy.specie },
        ]);
      })
      .catch(error => {
        alert(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (post) {
      setTaxonomyData([
        { category: 'Reino', data: post.kingdom },
        { category: 'Filo', data: post.phylum },
        { category: 'Classe', data: post.className },
        { category: 'Ordem', data: post.order },
        { category: 'Família', data: post.family },
        { category: 'Gênero', data: post.genus },
        { category: 'Espécie', data: post.specie },
      ]);
      form.setFieldsValue({
        kingdom: post.kingdom,
        phylum: post.phylum,
        className: post.className,
        order: post.order,
        family: post.family,
        genus: post.genus,
        specie: post.specie,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    post?.kingdom,
    post?.phylum,
    post?.className,
    post?.order,
    post?.family,
    post?.genus,
    post?.specie,
  ]);

  return (
    <Card
      title="TAXONOMIA"
      extra={post.userId === user?.id ? renderTaxonomyExtraButton() : null}
    >
      <Form form={form} name="formTaxonomy" onFinish={handleUpdateTaxonomy}>
        <Table
          size="small"
          pagination={false}
          columns={taxonomyColumns}
          dataSource={taxonomyData}
          rowKey={(_, index) => index}
        />
      </Form>
    </Card>
  );
};

export default Taxonomy;
