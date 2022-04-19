import React from 'react';
import Pagination from 'bulma-pagination-react';

const POSTS_PER_PAGE = 12;

const Pager = ({ posts, currentPage, perPage = POSTS_PER_PAGE }) => {
  const pages = Math.ceil(posts.length / perPage);

  return (
    <Pagination
      pages={pages}
      currentPage={currentPage}
      onChange={page => console.log(`/blog?page=${page}`)}
    />
  );
};

export default Pager;