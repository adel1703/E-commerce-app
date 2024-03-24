import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import categoryStyle from './categories.module.css';

export default function Categories() {
  function getAllCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => response.data);
  }

  const { data, isLoading, isError } = useQuery('allCategories', getAllCategories);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
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
    );
  }

  if (isError) {
    return <div className='fs-3 text-center fw-bold text-warning mt-3'>Error loading data.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className={`${categoryStyle.categoryContainer} container`}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4 mt-4">
          {data.data.map((category, idx) => (
            <div key={idx} className="col mb-5">
              <Link to={`/specificCategory/${category._id}`} className="text-decoration-none">
                <div className={categoryStyle.categoryCard}>
                  <img className={categoryStyle.categoryImage} src={category.image} alt={category.slug} />
                </div>
                  <h5 className={categoryStyle.categoryName}>{category.name}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
