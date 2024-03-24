import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Watch } from "react-loader-spinner";

export default function CategorySlider() {

    function getCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const {data, isLoading} = useQuery( 'getCategoriesSlider' , getCategories );

    if( isLoading === true ){

        return <div className="d-flex justify-content-center align-items-center">
            
        <Watch
          visible={true}
          height="100"
          width="100"
          radius="48"
          color="#0aad0a"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        
      </div>

    }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    
  };
  return (
    <Slider {...settings}>
      
      {data.data.data.map( (category , idx ) => <div key={idx}>
        <img style={{height:'200px'}} className="w-100" src={ category.image } alt={ category.name } />
        <h4 className="text-center mt-1 fs-6">{ category.name }</h4>
      </div> )}
      
    </Slider>
  );
}