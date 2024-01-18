import React, { useEffect, useRef } from "react";
import "./createpost.css";
import { useState } from "react";
import { createPostApi } from "../../redux/store/postApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyArea, setPropertyArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sqft");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [floors, setFloors] = useState("");
  const [facing, setFacing] = useState("");
  const [swimming, setSwimming] = useState("no");
  const [listingfor, setListingfor] = useState("");
  const [listedby, setListedby] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [communication, setCommunication] = useState("");
  const [listingtenure, setListingtenure] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.phonenumber) {
      navigate("/");
    }
  }, []);
  const createPostSubmit = (e) => {
    e.preventDefault();
    const areaWithUnit = propertyArea + areaUnit;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("propertyImage", file[i]);
    }
    formData.append("propertyType", propertyType);
    formData.append("areaWithUnit", areaWithUnit);
    formData.append("area", area);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("price", price);
    formData.append("currency", currency);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("furnishing", furnishing);
    formData.append("floors", floors);
    formData.append("facing", facing);
    formData.append("swimming", swimming);
    formData.append("listingfor", listingfor);
    formData.append("listedby", listedby);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("whatsapp", whatsapp);
    formData.append("communication", communication);
    formData.append("listingtenure", listingtenure);

    createPostApi({ formData, userId, navigate }, dispatch);
  };
  return (
    <div className="createPostContainer">
      <h2>New Post</h2>
      <div className="createFormContainer">
        <form>
          <div className="formTopSection">
            <div className="createFormLeft">
              <div className="columnOne">
                <label htmlFor="propertyImage">Choose images</label>
              </div>
              <div className="columnTwo">
                <input
                  type="file"
                  name="propertyImage"
                  id="propertyImage"
                  onChange={(e) => setFile(e.target.files)}
                  multiple
                />
              </div>
              <div className="columnOne">
                <label htmlFor="propertyType">Property type</label>
              </div>
              <div className="columnTwo">
                <select
                  name="propertyType"
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="building">building</option>
                  <option value="commercial">commercial Space</option>
                  <option value="plot">plot</option>
                  <option value="apartment">Apartment</option>
                  <option value="farm">farm Land</option>
                  <option value="resort">resort</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="propertyArea">Property Area </label>
              </div>
              <div className="columnTwo">
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="propertyArea"
                    id="propertyArea"
                    value={propertyArea}
                    onChange={(e) => setPropertyArea(e.target.value)}
                  />
                  <select
                    name="unit"
                    onChange={(e) => setAreaUnit(e.target.value)}
                    id="unit"
                    autoComplete="false"
                    value={areaUnit}
                  >
                    <option value="sqft">Sq.ft</option>
                    <option value="sqyd">Sq.yds</option>
                  </select>
                </div>
              </div>
              <div className="columnOne">
                <label htmlFor="area">Property Location</label>
              </div>
              <div className="columnTwo">
                <div className="locationList">
                  <input
                    type="text"
                    placeholder="Area"
                    name="area"
                    id="area"
                    autoComplete="false"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    name="state"
                    id="state"
                    autoComplete="false"
                    onChange={(e) => setState(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    id="country"
                    autoComplete="false"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="columnOne">
                <label htmlFor="price">Price</label>
              </div>
              <div className="columnTwo">
                <div className="priceGroup">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Price"
                    id="price"
                    name="price"
                    value={price}
                    autoComplete="false"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <select
                    name="currency"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="inr">INR</option>
                  </select>
                </div>
              </div>
              <div className="columnOne">
                <label htmlFor="bedrooms">Bedrooms</label>
              </div>
              <div className="columnTwo">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="bedrooms"
                  id="bedrooms"
                  name="bedrooms"
                  autoComplete="false"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
              <div className="columnOne">
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div className="columnTwo">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="bathrooms"
                  id="bathrooms"
                  name="bathrooms"
                  autoComplete="false"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </div>
            </div>
            <div className="createFormRight">
              <div className="columnOne">
                <label htmlFor="furnishing">Furnishing</label>
              </div>
              <div className="columnTwo">
                <select
                  name="furnishing"
                  id="furnishing"
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="full furnished">Full Furnished</option>
                  <option value="semi furnished">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="floors">Floors</label>
              </div>
              <div className="columnTwo">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="floors"
                  value={floors}
                  id="floors"
                  name="floors"
                  autoComplete="false"
                  onChange={(e) => setFloors(e.target.value)}
                />
              </div>
              <div className="columnOne">
                <label htmlFor="facing">Facing</label>
              </div>
              <div className="columnTwo">
                <select
                  name="facing"
                  id="facing"
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="swimming">Swimming pool</label>
              </div>
              <div className="columnTwo">
                <select
                  name="swimming"
                  id="swimming"
                  value={swimming}
                  onChange={(e) => setSwimming(e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="listingfor">Listing for</label>
              </div>
              <div className="columnTwo">
                <select
                  name="listingfor"
                  id="listingfor"
                  value={listingfor}
                  onChange={(e) => setListingfor(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                  <option value="book">Book</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="listedby">Listed By</label>
              </div>
              <div className="columnTwo">
                <select
                  name="listedby"
                  id="listedby"
                  value={listedby}
                  onChange={(e) => setListedby(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="owner">Owner</option>
                  <option value="agent">Agent</option>
                  <option value="consultant">Consultant</option>
                  <option value="tenant">Tenant</option>
                </select>
              </div>
            </div>
          </div>
          <div className="formMiddleSection">
            <div className="detailsOfLister">
              <h2>Details of the lister</h2>
            </div>
          </div>
          <div className="formBottomSection">
            <div className="createFormLeft">
              <div className="columnOne">
                <label htmlFor="name"> Name</label>
              </div>
              <div className="columnTwo">
                <input
                  type="text"
                  placeholder="name"
                  id="name"
                  name="name"
                  autoComplete="false"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="columnOne">
                <label htmlFor="contact">Contact</label>
              </div>
              <div className="columnTwo">
                <input
                  type="text"
                  placeholder="Contact"
                  value={contact}
                  id="contact"
                  autoComplete="false"
                  name="contact"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="columnOne">
                <label htmlFor="email">Email</label>
              </div>
              <div className="columnTwo">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="false"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="createFormRight">
              <div className="columnOne">
                <label htmlFor="whatsapp">WhatsApp</label>
              </div>
              <div className="columnTwo">
                <input
                  type="text"
                  placeholder="Whatsapp number"
                  id="whatsapp"
                  name="whatsapp"
                  autoComplete="false"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
              <div className="columnOne">
                <label htmlFor="communication">Communication option</label>
              </div>
              <div className="columnTwo">
                <select
                  name="communication"
                  id="communication"
                  value={communication}
                  autoComplete="false"
                  onChange={(e) => setCommunication(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value="phone">Phone</option>
                  <option value="email">email</option>
                  <option value="whatsapp">whatsapp</option>
                </select>
              </div>
              <div className="columnOne">
                <label htmlFor="tenure">Listing tenure</label>
              </div>
              <div className="columnTwo">
                <select
                  name="tenure"
                  id="tenure"
                  value={listingtenure}
                  onChange={(e) => setListingtenure(e.target.value)}
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option value={1}>1 month</option>
                  <option value={3}>3 month</option>
                </select>
              </div>
            </div>
          </div>
          <div className="createFormSubmitButton">
            <button type="submit" onClick={createPostSubmit}>
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
