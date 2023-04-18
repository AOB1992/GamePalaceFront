import React, { useState } from 'react';
import { Pages } from '../Pagination/Pagination.jsx';
import Card from './Card';
import './Card.css'



const ContainerCards = ({ products }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)

  const totalProducts = products.length
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const productsPage = products.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='container_all2'>

      <Pages
        totalPost={totalProducts}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className='containerCards'>
        {
          productsPage?.map(p => (
            <Card
              key={p.id}
              id={p.id}
              image={p.imageurl}
              name={p.namedisplay}
              price={p.price}
              description={p.description}
              stock={p.stock}
            />
          ))
        }
      </div>


    </div>

  )
};

export default ContainerCards
