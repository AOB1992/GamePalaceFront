import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllFavs } from '../../Redux/Actions/actions';
import CardsFavs from './CardsFavs'

const ListFavs = () => {

  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites);

  const { user } = useAuth0();
  const users = useSelector(state => state?.users);
  const findUser = users?.find(us => us?.email === user?.email)

  return (
    <div className='list-favs'>
      <h1 className='name_prod'>Favourites</h1>
      <div><Button onClick={() => dispatch(deleteAllFavs({ userId: findUser?.id }))}>Delete all favourites</Button></div>
      {
        favourites.length > 0 ? <CardsFavs /> :
        <div className='container_empty'><h1 color='white'>Please add items to your list</h1></div>

      }
    </div>
  )
}

export default ListFavs;
