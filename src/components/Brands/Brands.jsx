import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Brands() {
  function getAllBrands() {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/brands`)
      .then((response) => response.data);
  }

  const { data, isLoading, isError } = useQuery('allBrands', getAllBrands);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Watch
          visible={true}
          height={100}
          width={100}
          radius={48}
          color="#0aad0a"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return <div className='fs-3 text-center fw-bold text-warning mt-3'>Error loading data.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4 mt-4">
          {data.data.map((brand, idx) => (
            <div key={idx} className="col">
              <Link to={`/specificBrand/${brand._id}`} className="text-decoration-none">
                <div className='brand-card p-3 text-center text-white rounded shadow'>
                  <img className='brand-image w-100 rounded mb-3' src={brand.image} alt={brand.slug} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
