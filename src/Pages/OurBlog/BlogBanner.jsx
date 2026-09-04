import React from 'react'
import Blogbanner from "../../Assets/Banners/blogbanner.jpg"
function BlogBanner() {
  return (
    <>
      <section id='Blogbanner'>
        <img src={Blogbanner} alt="Neo Blog Banner" className='img-fluid'  width="1600" height="400" />
      </section>
    </>
  );
}

export default BlogBanner