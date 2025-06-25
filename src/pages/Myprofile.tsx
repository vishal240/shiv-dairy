import { Edit, Mail, MapPin, Phone, User } from "react-feather";

import amulbanner from "../assets/ban2.jpg";

import TopSideBar from "../components/TopSideBar";

import profile from "../assets/profile.jpg";

const Myprofile = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">My Profile</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span className="active">My Profile</span>
              </div>
            </div>
            <div className="col-md-6 pt-3">
              <span className="gap-10 d-flex align-items-center justify-content-md-end">
                <button className="black_btn">
                  {" "}
                  <Edit></Edit> Edit Profile
                </button>
              </span>
            </div>
          </div>
          <div className="row px-2 py-3">
            <div className="col-md-4 pt-2">
              <div className="store_card">
                <div className="image_wrapper">
                  <img src={amulbanner} className="shop_banner"></img>
                  <img src={profile} className="shop_img"></img>
                </div>
                <div className="d-flex align-items-start gap-10 justify-content-center pt-4 mt-3">
                  <h1 className="store_name">Shiv Dairy</h1>
                  <span className="status in">Admin</span>
                </div>
                <p className="font-12 text-center color-grey">
                  Created on 24 October 2025
                </p>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <User></User>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">User</p>
                    <p className="font-12">user@mail.com</p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <Mail></Mail>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Email</p>
                    <p className="font-12">lindablair@mail.com</p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <Phone></Phone>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Phone</p>
                    <p className="font-12">+91 62617010116</p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <MapPin></MapPin>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Address</p>
                    <p className="font-12">
                      315, Annapurna Road, Cipla Complex, Indore, (M.p) 452001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 pt-2">
              <div className="row px-2 ">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">General Information</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Name</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">User ID</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Email Address</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Phone</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-12 col-12 pt-3">
                        <label className="lbl">Address</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">City</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">State</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">ZIP</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Country</label>
                        <input type="text" className="input_text "></input>
                      </div>

                      <div className="row pt-4">
                        <h5 className="card_heading">Change Password</h5>
                      </div>

                      <div className="col-md-4 col-12 pt-3">
                        <label className="lbl">Old Password</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-4 col-12 pt-3">
                        <label className="lbl">New Password</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-4 col-12 pt-3">
                        <label className="lbl">Confirm Password</label>
                        <input type="text" className="input_text "></input>
                      </div>

                      <div className="row">
                        <div className="col-12 pt-3">
                          <button className="black_btn">Change Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
