import React from 'react'
import ProductCarousel from '../components/Carousel'
import Categories from '../components/Categories'
import Products from '../components/Products'
import SearchBox from '../components/SearchBox'

 
const HomeScreen = () => {
    return (
      <>
      <SearchBox/>
      <ProductCarousel/>
      <Categories/>
      <Products/>
      </>
    )
}

export default HomeScreen
