import React from "react";
import "./post.css";
import { MdOutlinePhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Pagination } from "swiper/modules";

import { basetoString } from "../../function/basetoString";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  return (
    <>
      <div className="postContainer">
        <div className="imageContainer">
          {post?.propertyImage?.length > 0 && (
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              pagination={{
                clickable: true,
              }}
              observer={true}
              observeParents={true}
              parallax={true}
              navigation={false}
              modules={[EffectFade, Pagination]}
              className="mySwiper"
            >
              {post.propertyImage.map((image, index) => {
                let base64String;
                if (image?.data?.data) {
                  base64String = basetoString(image?.data?.data);
                } else if (image.data) {
                  base64String = image.data;
                }
                return (
                  <SwiperSlide key={index}>
                    <img
                      key={index}
                      src={
                        image?.data
                          ? `data:${image.contentType};base64,${base64String}`
                          : ""
                      }
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        <div className="rightSection">
          <div className="description">
            <ul>
              <li>propertyID : {post?.postId} </li>
              <li>Type: {post?.propertyType}</li>
              <li>Area : {post?.propertyArea}</li>
              <li>Price : {post?.price}</li>
              <li>listed By : {post?.listedby}</li>
            </ul>
            <div className="moreInfo">
              <Link to={`/singlepost/${post._id}`}>
                <BsInfoCircle />
              </Link>
            </div>
          </div>
          <div className="subContainer">
            <Link
              to={`https://wa.me/${post?.contact}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="subBottons whatsapp">
                <FaWhatsapp />
                Whatsapp
              </div>
            </Link>
            <Link to={`tel:${post?.contact}`}>
              <div className="subBottons contact">
                <MdOutlinePhone />
                Contact
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
