import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Watch } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Profile() {

    const {userData} = useContext(authContext);

    if(!userData){
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
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

  return <>
  <Helmet>
        <title>Profile</title>
      </Helmet>
  <div className='text-center mt-5'>
    
    <h1>Welcome <span className='text-main fw-bold'>"{userData?.name}"</span> </h1>
    <h5>id: {userData?.id}</h5>
    <h5>Role: {userData?.role} account</h5>
  
  
  </div>
  </>
}
