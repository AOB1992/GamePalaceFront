import { useDispatch, useSelector } from "react-redux";
import './CardsFavs.css'
import { deleteFavs } from "../../Redux/Actions/actions";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const CardsFavs = () => {

  const favourites = useSelector(state => state.favourites);
  const dispatch = useDispatch();

  const { user } = useAuth0();
  const users = useSelector(state => state?.users);
  const findUser = users?.find(us => us?.email === user?.email)

  const handleDeleteFav = (id) => {
    dispatch(deleteFavs({ userId: findUser?.id, productId: id }))
  }


  return (
    <div className='cards-favs-cont'>


      {
        favourites.length > 0 && favourites.map(fav => {
          return <div className='cards-favs' key={fav.id}>

            <div className="wrapper_fav">

              <div className="info__container">
                <Link to={`/detail/${fav.id}`}> <img src={fav.imageurl} alt='*' width='150px' height='100px' /></Link>
                <h5>{fav.namedisplay}</h5>
                <h4><b>US$ {fav.price}</b></h4>
              </div>

              <div className="butt_contain">
                <button className='fav-btn' onClick={() => handleDeleteFav(fav.id)}>{<BsTrashFill />}</button>
              </div>

            </div>


          </div>

        })
      }

    </div>
  )
};

export default CardsFavs;
