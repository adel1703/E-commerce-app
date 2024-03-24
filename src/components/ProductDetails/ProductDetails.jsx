import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ColorRing, Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

const [isStillLOading, setIsStillLOading] = useState(false);

    
    const {addProductToCart} = useContext(cartContext);
    
    const {id} = useParams();

    async function addProduct(id){
        setIsStillLOading(true);
        const res = await addProductToCart(id);
        
        if(res){
            setIsStillLOading(false);
            toast.success('Product Added Successfully.' , {
                duration: 3000 ,
                position: 'top-center',
                
                
            }
            
            )
        }else{
            setIsStillLOading(false);
            toast.error(`Can't Add Product.` , {
                duration: 3000 ,
                position: 'top-center',
        })

    }
}


    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data , isError , isLoading  } = useQuery(`productDet-${id}` , getProductDetails );

    if( isError ){
       return <Navigate to='/products' />
    }

    if( isLoading ){
        return <div className="d-flex justify-content-center align-items-center vh-100">
                
        <Watch
          visible={true}
          height="150"
          width="150"
          radius="48"
          color="#0aad0a"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        
      </div>
      }

  return <>
  <Helmet>
      <title>{data.data.data.title}</title>
    </Helmet>
      <div className="container mt-5 mb-5">

        <div className="row align-items-center">

            <div className="col-3">
                <figure>
                    <img src={data.data.data.imageCover} className='w-100' alt={data.data.data.title} />
                </figure>
            </div>
            <div className="col-9">
                <article>
                    <h1>{data.data.data.title}</h1>
                    <p>{data.data.data.description}</p>
                    <p className='text-main fs-4 fw-bold'>{data.data.data.price} LE.</p>
                    <button onClick={ ()=>addProduct(data.data.data.id)} className='btn bg-main text-white w-100' >
                    {isStillLOading ? (
                        <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["white", "white", "white", "white", "white"]}
                        />
                    ) : (
                        "Add to Cart"
                    )}
                    </button>
                </article>
            </div>

        </div>

      </div>

  </>
}
