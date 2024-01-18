import React, { useEffect, useState } from "react";
import "./singlepost.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import Loading from "../../components/Loading/Loading";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import imageNotAvailable from "../../assets/Image_not_available.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { basetoString } from "../../function/basetoString";
import { useSelector } from "react-redux";
const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const { pending } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    window.scrollY = 0;

    const handleRouteChange = () => {
      window.scrollY = 0;
    };

    window.addEventListener("routeChange", handleRouteChange);

    return () => {
      window.removeEventListener("routeChange", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    const fetchSinglePost = async () => {
      const singlepost = await axios.get(
        `http://localhost:2345/post/singlepost/${id}`
      );
      setSinglePost(singlepost.data);
    };
    fetchSinglePost();
  }, [id]);
  if (!singlePost.name) {
    return <Loading />;
  }
  return (
    <div className="singlePostContainer">
      <div className="imageContainer">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {singlePost?.propertyImage?.map((image, index) => {
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
      </div>
      <div className="singlePostBottom">
        <div className="detailsContainer">
          <div className="detailsTitle">
            <h2>Details</h2>
          </div>
          <div className="allDetails">
            <div className="row">
              <div className="column">
                <div className="left">Type</div>
                <div className="right">{singlePost.propertyType}</div>
              </div>
              <div className="column">
                <div className="left">Bathrooms</div>
                <div className="right">{singlePost.bathrooms}</div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Bedrooms</div>
                <div className="right">{singlePost.bedrooms}</div>
              </div>
              <div className="column">
                <div className="left">Furnishing</div>
                <div className="right">{singlePost.furnishing}</div>
              </div>
            </div>
            {/* <div className="row">
              <div className="column">
                <div className="left">Construction Status</div>
                <div className="right"> Ready to Move</div>
              </div>
            </div> */}
            <div className="row">
              <div className="column">
                <div className="left"> Builtup area</div>
                <div className="right">{singlePost.propertyArea}</div>
              </div>
              <div className="column">
                <div className="left">Listed by </div>
                <div className="right">{singlePost.listedby}</div>
              </div>
              {/* <div className="column">
                <div className="left">Carpet Area (ft²)</div>
                <div className="right">1900</div>
              </div> */}
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Maintenance (Monthly)</div>
                <div className="right">00</div>
              </div>
              <div className="column">
                <div className="left">Total Floors</div>
                <div className="right">{singlePost.floors}</div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Floor No </div>
                <div className="right">3</div>
              </div>
              <div className="column">
                <div className="left">Car Parking</div>
                <div className="right">1</div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="left">Facing</div>
                <div className="right">East</div>
              </div>
              <div className="column">
                <div className="left">Project Name</div>
                <div className="right">new villas</div>
              </div>
            </div>
          </div>
          <div className="singlePostDescription">
            {/* <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Excepturi possimus fugit officiis, esse beatae nam, debitis est
              animi pariatur soluta voluptatibus quae, perferendis aliquam!
              Consequuntur delectus at laudantium porro.
            </p> */}
          </div>
        </div>
        <div className="singlePostContacts">
          <div className="priceContainer">
            <h1>RS {singlePost.price}</h1>
            <p>
              {singlePost.bedrooms} Bds - {singlePost.bathrooms} Ba -
              {singlePost.propertyArea}
            </p>
            <div className="priceContainerSub">
              <p>
                {singlePost.area}, {singlePost.state}, {singlePost.country}
              </p>
              <p>Nov 28</p>
            </div>
          </div>
          <div className="ownerDetailsContainer">
            <div className="ownerTitle">
              <div>
                <img src={imageNotAvailable} alt="" />
                <h3>Ram mohan </h3>
              </div>
              <span>
                <IoIosArrowForward />
              </span>
            </div>
            <div className="visitProfile">
              <p>View Profile</p>
            </div>
            <div className="ownerProfile"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
