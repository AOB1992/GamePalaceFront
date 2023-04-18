/* eslint-disable no-unreachable */
import axios from "axios";


import {GET_USER_PRODUCTS, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_DETAIL, GET_PRODUCT_FILTER, ADD_FAV, DELETE_FAV, GET_CART,GET_BY_MONTH, ADD_CART, DELETE_CART,GET_STATS,GET_BY_YEAR, TOTAL_BUY, RESTORE_TOTAL_BUY, NEW_REVIEW, SET_LOADING, GET_USERS, GET_USER, TOTAL_TO_PAY, GET_FAVS, DELETE_ALL_FAVS, DELETE_ALL_CART, GET_USER_BY_MAIL, DELETE_THIS_ORDER, UPDATE_USER } from "./constants";


export const getUserProducts = (userid) => {
	return async function (dispatch) {
		const response = await axios.get(`/userProducts/${userid}`);
		return dispatch({
			type: GET_USER_PRODUCTS,
			payload: response.data,
		});
	};
};




export const getArray = (payload) => {
	return async function (dispatch) {
		const response = await axios.get(`/function2?word=${payload.word}&filter1=${payload.filter1}&filter2=${payload.filter2}&order=${payload.order}`)
		return dispatch({
			type: GET_PRODUCT_FILTER,
			payload: response.data
		});
	};
};


export const getAllProducts = () => {
	return async function (dispatch) {
		const response = await axios.get(`/products`);
		return dispatch({
			type: GET_ALL_PRODUCTS,
			payload: response.data,
		});
	};
};

export const getAllCategories = () => {
	return async function (dispatch) {
		const response = await axios.get(`/categories`);
		return dispatch({
			type: GET_ALL_CATEGORIES,
			payload: response.data,
		});
	};
};


export const getByMonth = (month) => {
	return async function (dispatch) {
		const response = await axios.get(`/stats/getbymonth/${month}`)
		return dispatch({
			type: GET_BY_MONTH,
			payload: response.data
		});
	};
};

export const getByYear = (year) => {
	return async function (dispatch) {
		const response = await axios.get(`/stats/getbyyear/${year}`)
		return dispatch({
			type: GET_BY_YEAR,
			payload: response.data
		});
	};
};



export const getStats = () => {
	return async function (dispatch) {
		const response = await axios.get(`/stats`);
		return dispatch({
			type: GET_STATS,
			payload: response.data,
		});
	};
};




export const postNewProduct = (data) => {
	try {
		return async function () {
			const newProduct = await axios.post(`/products`, data);
			return newProduct
		}
	} catch (error) {
		console.log(error)
	};
};

export const changeProduct = (data) => {
	try {
		return async function () {
			const changeProduct = await axios.post(`/change`, data);
			return changeProduct
		}
	} catch (error) {
		console.log(error)
	};
};

export const updateProduct = (data) => {
	try {
		return async function () {
			const updateProduct = await axios.post(`/products`, data);
			return updateProduct

		}
	} catch (error) {
		console.log(error)
	};
};

export const newReview = (data) => {
	try {
		return async function () {
			const newReview = await axios.post(`/review`, data);
			return newReview

		}
	} catch (error) {
		console.log(error, "no data")
	};
};

export const newUser = (user) => {
	try {
		return async function (dispatch) {
			const newUser = await axios.post(`/users`, user)
			return dispatch({
				type: GET_USER,
				payload: newUser.data
			})
		}
	} catch (error) {
		console.log((error, "Llena los campos pues"));
	}
	// return async (dispatch) => {
	// 	try {
	// 	  const response = await fetch(`/users`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(user),
	// 		headers: {
	// 		  'Content-Type': 'application/json'
	// 		}
	// 	  });
	
	// 	  const data = await response.json();
	
	// 	  if (response.ok) {
	// 		dispatch(newUser(data));
	// 		return { success: true };
	// 	  } else {
	// 		return { error: data.message };
	// 	  }
	// 	} catch (error) {
	// 	  console.error(error);
	// 	  return { error: 'Error de red' };
	// 	}
	//   };
}


export const getUser = () => {
	try {
		return async function (dispatch) {
			const user = await axios.get(`/users`)
			return dispatch({
				type: GET_USERS,
				payload: user.data
			})
		}
	} catch (error) {
		console.log(error);
	}
}

export const updateUser = (user) => {
	try {
		return async function (dispatch) {
			const userUp = await axios.post(`/updateuser`, user)
			return dispatch({
				type: UPDATE_USER,
				payload: userUp.data
			})
		}
	} catch (error) {
		console.log((error, "Llena los campos pues"));
	}
}

export const postByMail = (email) => {
	return async function (dispatch) {
		fetch(`/getuserbymail`, {
			body: JSON.stringify({email: email}),
			method: "POST",
			headers: {"Content-type": "application/json"}
		})
		.then(response => response.json())
		.then(data => dispatch({
			type: GET_USER_BY_MAIL,
			payload: data
		}))
	}
}


export const getDetail = (id) => {
	return async (dispatch) => {
		 axios.get(`/products/${id}`).then((x) => {
			console.log("el response del review es este...")
		console.log(x)
		return dispatch({
			type: GET_DETAIL,
			payload: x.data, 
		 })
		
		});
	};
};


// export const getDetail = (id) => {
// 	return async (dispatch) => {
// 		const response = await axios.get(`/products/${id}`);
// 		return dispatch({
// 			type: GET_DETAIL,
// 			payload: response.data,
// 		});
// 	};
// };

export const addFav = (id, item) => {
	return async (dispatch) => {
		const response = await axios.post(`/favorite/${id}`, item);
		return dispatch({
			type: ADD_FAV,
			payload: response.data,
		});
	};
};

export const deleteFavs = (item) => {
	return async (dispatch) => {
		await axios.post(`/deletefav`, item);
		return dispatch({
			type: DELETE_FAV,
			payload: item
		})
	}				
};

export const deleteAllFavs = (id) => {
	return async (dispatch) => {
		await axios.post(`/deleteallfav`, id);
		return dispatch({
			type: DELETE_ALL_FAVS,
		})
	}
}

export const getFavs = (id) => {
	return async (dispatch) => {
		await axios.get(`/getfavorites/${id}`)
		.then(res=> {
			dispatch({
				type: GET_FAVS,
				payload: res.data[0]?.favorites
			})
		})
	}
};


export function setLoading(payload) {
	return {
		type: SET_LOADING,
		payload
	};
};


export const addCart = (product) => {
	return async () => {
		await axios.post(`/addproduct`, product);
		
	};
};

export const getCart = (id) => {
	try {
	return async (dispatch) => {
		await axios.get(`/getcartbyid/${id}`)
		.then(res=>{
			dispatch({
				type: GET_CART,
				payload: res.data
			})
		})			
	}
		
	} catch (error) {
		console.log(error)
	}
}

export const deleteItemCart = (product) => {
	return async () => {
		await axios.post(`/deleteproduct`, product);
		
	};
};

export const deleteAllCart = (id) => {
	return async (dispatch) => {
		await axios.post(`/deleteallproducts`, id);
		return dispatch({
			type: DELETE_ALL_CART
		})
	}	
};

export const totalBuy = (payload) => {
	return {
		type: TOTAL_BUY,
		payload
	}
};

export const restoreTotalBuy = () => {
	return {
		type: RESTORE_TOTAL_BUY,
	}

};

export const deleteThisOrder = (idproduct) => {
	return {
		type: DELETE_THIS_ORDER,
		payload: idproduct
	}
}

export const totalToPay = (item) => {
	return {
		type: TOTAL_TO_PAY,
		payload: item
	}
};



export const totalPayment =(prods) => {
	return async () => {
		await axios.post("/payment", prods)
		.then(res => window.location.href = res.data.response.body.init_point)
	}
}





export const sendNMailer = (aBody) => {
	return async () => {
		axios.post("/nmailer", aBody)
	}
}


export const changeStock = (info) => {
	return async () => {
		axios.post("/change/stock", info)
	}
}


export const updateQtyCart = (item) => {
	return async () => {
		await axios.post("/updateproduct", item)
	}
}

export const successBuy = (userid) => {
	return async () => {
		await axios.post("/stats/register", userid)
	}
}