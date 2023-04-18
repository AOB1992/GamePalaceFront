import imagen1 from "../../image/imgCarrusel/razer-productos.png";
import imagen2 from "../../image/imgCarrusel/EVGA-1.png";
import imagen3 from "../../image/imgCarrusel/TRITON-WHITE-03-1.png";
import logitech from "../../image/imgCarrusel/pngegg.png"
import nvidia from "../../image/imgCarrusel/nvidia.png"
import asus from "../../image/imgCarrusel/asus.png"
import razer from "../../image/imgCarrusel/razer.png"
import hyper from "../../image/imgCarrusel/hyper.png"
import Carousel from 'react-bootstrap/Carousel';
import "./Home.css"
import React, { useEffect } from "react";
import { getUser } from "../../Redux/Actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCart, getFavs } from "../../Redux/Actions/actions";



export const Home = () => {


    const dispatch = useDispatch();
    const {user} = useAuth0();
    const users = useSelector(state=> state?.users);
    const findUser = users.length>0 ? users.find(us => us?.email === user?.email) : null;

    useEffect(()=>{
        dispatch(getAllProducts())
        dispatch(getUser())
    },[dispatch])

    useEffect(()=>{
        dispatch(getCart(findUser?.id))
        dispatch(getFavs(findUser?.id))
    },[findUser])



    // console.log(persistorState);



    return (

        <div className="containerGeneral">

            

            <div className="carousel_1">
                <Carousel variant="dark"
                    className="carousel_indicators"
                    controls={false}
                    indicators={false}
                >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={imagen3}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text_area">Best performance</h3>
                            <p className="text_area">Products available</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={imagen2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text_area">Improve your skills</h3>
                            <p className="text_area">The best keyboards</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={imagen1}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text_area">Play at another level</h3>
                            <p className="text_area">
                                Buy Razer here!
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="carousel2_container">
                <div className="text_car">
                    <h1 className="text_carousel2">Brands</h1>
                </div>
                <div className="carousel_2">
                    <Carousel variant="dark"
                        controls={false}
                        indicators={false}
                        interval={1000}
                    >
                        <Carousel.Item>
                            <img
                                className="d-block2 w-100"
                                src={logitech}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block2 w-100 Second_slide"
                                src={asus}
                                alt="Second_slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block2 w-100"
                                src={razer}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block2 w-100"
                                src={nvidia}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block2 w-100"
                                src={hyper}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>

            </div>

        </div>

    );
}
