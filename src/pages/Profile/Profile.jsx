import React, { useEffect, useState } from "react";
import "./profile.css";
import imageNotAvailable from "../../assets/man.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { basetoString } from "../../function/basetoString";
import NodataFound from "../../components/NodataFound/NodataFound";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?.id;
  const [postLists, setPostLists] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const handleDelete = async (id) => {
    try {
      const afterdelete = await axios.delete(
        `https://htl-backend-92bi.onrender.com/post/delete/${id}`
      );

      if (afterdelete.data.post === null) {
        setPostLists([]);
      } else {
        setPostLists(afterdelete.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await axios.get(
          `https://htl-backend-92bi.onrender.com/user/profile/${userId}`
        );
        setUserDetails(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, []);
  useEffect(() => {
    const userposts = async () => {
      try {
        const posts = await axios.get(
          `https://htl-backend-92bi.onrender.com/post/profile/${userId}`
        );
        setPostLists(posts.data);
      } catch (error) {
        console.log(error);
      }
    };

    userposts();
  }, []);
  return (
    <div className="profileContainer">
      <div className="topSection">
        <div className="topLeftContainer">
          <img src={imageNotAvailable} alt="" />
        </div>
        <div className="topRightContainer">
          <div>
            <p>NAME : {userDetails?.username}</p>
            {userDetails?.username && <a href="#">edit</a>}
          </div>
          <div>
            <p>MOBILE NO : {userDetails?.phoneNumber}</p>
            {userDetails?.phoneNumber && <a href="#">verify</a>}
          </div>
          <div>
            <p>EMAIL : {userDetails?.email}</p>
            {userDetails?.email && <a href="#">verify</a>}
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="title">
          <h1>YOUR ADs</h1>
        </div>
        <div className="postsContainer gridContainer">
          {postLists.length !== 0 ? (
            postLists?.map((post) => {
              return (
                <div className="postLists" key={post._id}>
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
                        <div
                          className="delete"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NodataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
