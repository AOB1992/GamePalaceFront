

import {GET_USER_PRODUCTS, GET_ALL_PRODUCTS, GET_BY_MONTH, GET_BY_YEAR, CHANGE_PRODUCT, GET_DETAIL,GET_STATS, POST_NEW_PRODUCT, ADD_FAV, GET_CART, GET_ALL_CATEGORIES, DELETE_FAV, GET_PRODUCT_FILTER, DELETE_CART, TOTAL_BUY, RESTORE_TOTAL_BUY, NEW_REVIEW, SET_LOADING, GET_USERS, GET_USER, GET_USER_BY_MAIL, TOTAL_TO_PAY, GET_FAVS, DELETE_ALL_FAVS, DELETE_ALL_CART, DELETE_THIS_ORDER, DELETE_PROD_PAYED } from "./Actions/constants";



const initialState = {
  allProducts: [],
  allCategories: [],
  details: [],
  favourites: [],
  shopCart: [],
  totalBuy: [0],

  users: [],
  user: [],
  userMail: [],
  totalToPay: [],
  salesByMonth: [],
  salesByYear:[],
  allStats: [],
  userProducts: []

};


const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_ALL_PRODUCTS:

      return {
        ...state, allProducts: action.payload
      }

      case GET_USER_PRODUCTS:
        return{
          ...state, userProducts : action.payload
        }


    case TOTAL_TO_PAY:
         for(let i=0; i<state.totalToPay.length; i++){
          if(state.totalToPay[i].name===action.payload.name){
            state.totalToPay[i].quantity=action.payload.quantity
            return {
            ...state
          }
          }
        }
      return {
        ...state,
        totalToPay: [...state.totalToPay, action.payload]
      }
      
      

    case GET_ALL_CATEGORIES:

      return {
        ...state, allCategories: action.payload
      }


    case GET_DETAIL:
    console.log("entrando a reducer get detail , action. payload es ...")
    console.log(action.payload)  
    return {
        
        ...state, details: action.payload,
      };

    case GET_PRODUCT_FILTER:
      return { ...state, allProducts: action.payload }


    case POST_NEW_PRODUCT:
      return {
        ...state
      };

    case NEW_REVIEW:
      return {
        ...state
      };

    case ADD_FAV:
      const addFav = state.allProducts.find(prod => prod.id === action.payload.productId)
      return {
        ...state,
        favourites: [...state.favourites, addFav]
      };

    case GET_CART:
      const prodsInCart = []
      for(let i=0; i<action.payload.length; i++){
        const findProduct = state.allProducts.find(prod=> prod.id === action.payload[i].idproduct)
        prodsInCart.push(findProduct)
      }
      return {
        ...state,
        shopCart: prodsInCart
      }

      case GET_FAVS:
        const prodsInFavs = []
      for(let i=0; i<action.payload?.length; i++){
        const findFavs = state.allProducts.find(prod=> prod.id === action.payload[i].productId)
        prodsInFavs.push(findFavs)
      }
        return {
          ...state,
          favourites: prodsInFavs
        }
    case DELETE_FAV:
      const favs = state.favourites.length > 0 && state.favourites.filter(fav => fav.id !== action.payload.productId);
      return {
        ...state,
        favourites: favs
      };

    case DELETE_ALL_FAVS:
      return {
        ...state,
        favourites: []
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case DELETE_CART:
      const prodsCart = state.shopCart.length > 0 && state.shopCart.filter(prod => prod.id !== action.payload);
      return {
        ...state,
        shopCart: prodsCart
      }

    case DELETE_ALL_CART:
      return {
        ...state,
        shopCart: []
      }

    case TOTAL_BUY:
      const totalAmounts = state.totalToPay.length>0 ? state.totalToPay?.map(prod => prod.quantity * prod.price) : 0;
      const totalCount = totalAmounts.length>1 ? totalAmounts.reduce((acc, curr)=> acc + curr) : totalAmounts;
      return {
        ...state,
        totalBuy: totalCount
      }

      case RESTORE_TOTAL_BUY:
        return {
          ...state,
          totalBuy: [0],
          totalToPay: []
        }

      case DELETE_THIS_ORDER:
        const deleteOneOrder = state.totalToPay.filter(prod => prod.idproduct !== action.payload.id)
        const totalbuy = state.totalBuy - (action.payload.quantity * action.payload.price)
        return {
          ...state,
          totalToPay: deleteOneOrder,
          totalBuy: totalbuy
        }

    case GET_USERS:
      return { ...state, users: action.payload }

      
    case GET_USER:
      return { ...state, user: action.payload }

      case GET_USER_BY_MAIL:
        return { ...state, userMail: action.payload }

          
      case GET_BY_MONTH:
        return{
          ...state, salesByMonth: action.payload
        } 

        case GET_STATS: 
        return{
          ...state, allStats: action.payload
        }

      case GET_BY_YEAR:
        return{
          ...state, salesByYear : action.payload
        }

        case CHANGE_PRODUCT:
          return {
            ...state
            };
            

           
      default:
      return state;
  }
};


export default rootReducer;
