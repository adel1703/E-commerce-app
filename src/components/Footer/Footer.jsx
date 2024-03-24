import React from 'react';

function Footer() {
  return (
    <footer className=' bg-light'>
      <div className='container-fluid p-5'>
        <h2>Get the FreshCart app</h2>
        <p>We will send you a link, open it on your phone to download the app</p>
        <div className='d-flex justify-content-between'>
          <input className='form-control w-75' type="email" placeholder="Enter your email" />
          <button className='btn bg-main text-white'>Share App Link</button>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
