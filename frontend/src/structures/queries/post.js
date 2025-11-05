const postQueryBuilders = {
  updatePost: data => {
    return `{
      x: ${data.data}
    }`;
  },
};

export default postQueryBuilders;
