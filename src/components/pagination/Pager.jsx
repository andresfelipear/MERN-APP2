import React from 'react';
import Pagination from 'bulma-pagination-react';



const Pager = ({ posts, currentPage, perPage, handlePage}) => {
  const pages = Math.ceil(posts.length / perPage);

  return (
    <Pagination
      pages={pages}
      currentPage={currentPage}
      onChange={page => {handlePage(page)}}
      isCentered
    />
  );
};

export default Pager;