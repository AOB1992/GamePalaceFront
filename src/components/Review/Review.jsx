import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, newReview } from '../../Redux/Actions/actions';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TbUserCircle} from "react-icons/tb"
import './Review.css'
const Swal = require('sweetalert2')



const Review = () => {


const [number, setNumber] = useState(0);
const [hoverStar, setHoverStar] = useState(undefined);

// function handleClick (e) {
//   window.location.reload(false);
// }



const handleText = () => {
  switch (number || hoverStar) {
    case 0:
      return "Evaluate";
    case 1:
      return "Dissatifation";
    case 2:
      return "Unsatisfied";
    case 3:
      return "Normal";
    case 4:
      return "Satisfied";
    case 5:
      return "Very Satisfied";
    default:
      return "Evaluate";
  }
};

const handlePlaceHolder = () => {
  switch (number || hoverStar) {
    case 0:
      return "Comment here...";
    case 1:
    case 2:
    case 3:
      return "What happened?";
    case 4:
    case 5:
      return "Why do you like the product?";
    default:
      return "Comment here...";
  }
  
};


const dispatch = useDispatch();

const detail = useSelector((state) => state.details)

console.log("detalle : ", detail)

const [input, setInput] = useState({
    author: "",
    title: "",
    description:"",
    productId: detail.id,
    rating: number,
})



const handleChange = ((e)=>{
    setInput({
        ...input,
        [e.target.name]: e.target.value,
        rating : number,
        title : detail.name,
        productId: detail.id,

    });
  
})
console.log(input)


const funcionCorneta= ((e)=>{
  alert(detail.reviews)
})

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    if (input.author.length>0){
     dispatch(newReview(input));
    setInput({
      author: "",
      title: detail.name,
      description:"",
      rating: number,
      productId: detail.id,
      // userId: "",
    });  window.location.reload(true);
    } else
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Please enter a name author!',
      timer: 1600
    })
   
    console.log("despachando creacion")
    console.log(input)
};

  // useEffect(() => { 
  //   dispatch(getDetail(detail.id));
 
    
  // },[]);


 

  return (
    
    <div className='mainContainer'>

    {/* <button  onClick={(e) => funcionCorneta(e)}>redux detail</button> */}
{/* <h6 key="detallekey">{detail}</h6> */}

    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="all">
        <div className="popup">
          <div className="content">
            <div className='containerProduct'>
                <h5>{detail.name}</h5>
            </div>
      
      {/* ///////////////////////////////////////////////////////////////////////////////// */}

          <div className='containerRate'>
              <h1>How pleased are you with the product?</h1>
              <div className="textNstars">
                      <div className="stars">
                      
                        {Array(5)
                          .fill()
                          .map((_, index) =>
                              number >= index + 1 || hoverStar >= index + 1 ? (
                              <AiFillStar
                                  onMouseOver={() => !number && setHoverStar(index + 1)}
                                  onMouseLeave={() => setHoverStar(undefined)}
                                  style={{ color: "orange" }}
                                  onClick={() => setNumber(index + 1)}
                            />
                            ) : (
                              <AiOutlineStar
                                  onMouseOver={() => !number && setHoverStar(index + 1)}
                                  onMouseLeave={() => setHoverStar(undefined)}
                                  style={{ color: "orange" }}
                                  onClick={() => setNumber(index + 1)}
                            />
                          )
                      )}

                      </div>

                      <h4 className="textR">{handleText()}</h4>

              </div>
          </div>

      {/* //////////////////////////////////////////////////////////////////////////////// */}




          <div className='containerComment'>
            <h1>Leave a comment</h1>
            <textarea id="description" value={input.description} name= "description" placeholder={handlePlaceHolder()}  onChange={(e) => handleChange(e)}></textarea> 
            <input type="text" value={input.author} name= "author" placeholder= "  full name"  onChange={(e) => handleChange(e)} />
            <label>(*)</label>
          </div>

          <div>
            <button type="submit" id="createreview" name= "createreview" value="createreview" className='createreview'   >Submit</button>
          </div>
          </div>
        </div>
      </div>
    </form>


    <div className='popuptwo'>
      
      

        <div className="containerRevs">
        {detail.reviews?.map(review =>(
                          <div className='containerNewRev'>
                            <div className='authorNstars'>
                            <TbUserCircle className='iconUser'/><h5 item key={review.author}>{review.author}</h5> 
                              <div className='starsReview'>{
                                [... new Array(5)].map((star, index)=>{
                                    return index < review.rating ? <AiFillStar  style={{ color: "orange" }}/> : <AiOutlineStar  style={{ color: "orange" }} key={review.rating}/>
                                })}
                              </div>
                            </div> 
                            <h6 item key={review.description}>{review.description}</h6>
                            {/* <p item key={review.title}>{review.title}</p> */}
                          </div>
                      )) 
    }
                      
        </div>
       
    </div>  

       
    </div>

  )
};

export default Review
