import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArray } from "../../Redux/Actions/actions";
import './Searchbar.css'

export const Searchbar = () => {

    // constantes usadas en el filtrado para evitar hardcodeos!
    const [word, setWord] = useState("")
    const [filter1, setFilter1] = useState('empty')
    const [filter2, setFilter2] = useState('empty')
    const [order, setOrder] = useState('empty')

    const products = useSelector(state => state.allProducts)
    const marks = products.map(product => product.trademark)
    const marks2 = new Set(marks)
    const trademark = [...marks2]

    const catego = products.map(product => product.category)
    const catego2 = new Set(catego)
    const categories = [...catego2]

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        const obj = {
            word: word,
            filter1: filter1, //Logitech
            filter2: filter2,
            order: order
        }
        dispatch(getArray(obj))
    }

    const resetFilters = () => {
        setWord("")
        setFilter1("empty")
        setFilter2("empty")
        setOrder("empty")
    }

    return (
        <div className="contain_search">
            <form className="search__container"
                onSubmit={handleSearch}
            >
                <label for="name">Filter by Product name: </label>
                <input name="name" id="name" type="text" placeholder="Search..." className="search_text"
                    onChange={(e) => setWord(e.target.value)}
                    value={word}
                />

                <label for="trademark">Filter by Trademark: </label>
                <select
                    onChange={(e) => setFilter1(e.target.value)}
                    option="first"
                    selected="true"
                    className="select_text"
                >
                    <option selected="true" value="empty">Trademark...</option>
                    {trademark?.map(product => {
                        return <option value={product}>{product}</option>
                    })}

                </select>

                <label for="category">Filter by category: </label>
                
                <select onChange={(e) => setFilter2(e.target.value)}
                    className="select_text"
                >
                    <option selected value="empty">Categories...</option>
                    {categories?.map(product => {
                        return <option value={product}>{product.toUpperCase()}</option>
                    })}

                </select>

                <label for="trademark">Filter by Price: </label>
                <select onChange={(e) => setOrder(e.target.value)}
                    className="select_text"
                >
                    <option value="">Sort...</option>
                    <option value="nameup">↕A - Z↕</option>
                    <option value="namedown">↕Z - A↕</option>
                    <option value="priceup">$$$</option>
                    <option value="pricedown">$</option>
                </select>

                <input type="submit"
                    value="Apply filters"
                    className="button_search"
                />

                <button
                    onClick={() => resetFilters()}
                    className="search_text reset_filter"
                >
                    Reset filters
                </button>

            </form>
        </div>
    )
}
