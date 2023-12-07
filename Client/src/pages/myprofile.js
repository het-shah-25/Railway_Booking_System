import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { LogoutOutlined } from "@ant-design/icons";
import Footer from "./footer";

const ProfilePage = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem("user");
        const parsedUserData = JSON.parse(storedUserData);

        if (parsedUserData && parsedUserData._id) {
          setUserId(parsedUserData._id);

          const response = await axios.get(
            `/api/user/user-data/${parsedUserData._id}`
          );
          if (response.data) {
            setUserData(response.data);
          } else {
            console.error("Failed to fetch user data");
          }
        } else {
          console.error("Invalid user data format");
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Validate input (no numbers allowed in first name and last name)
    if (/\d/.test(userData.firstname) || /\d/.test(userData.lastname)) {
      message.error("Numbers are not allowed in the first name and last name.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/user/update-profile/${userId}`,
        userData
      );

      // console.log("Response:", response);

      if (response.data && response.data.user) {
        setUserData(response.data.user);
        message.success("Profile updated successfully");

        // Reload the page after 2 seconds (adjust the time as needed)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.error(`Failed to update profile: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("An error occurred while updating the profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="osahan-profile">
      <div className="osahan-header-nav shadow-sm bg-danger p-3 d-flex align-items-center">
        <h5 className="font-weight-normal mb-0 text-white">
          <a className="text-danger mr-3" href="/home">
            <i className="icofont-rounded-left" />
          </a>
          My Profile
        </h5>
        <div style={{ flex: 1 }}></div>
        <div
          onClick={logout}
          style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
        >
          <LogoutOutlined />
        </div>
      </div>
      <div className="px-3 pt-3 pb-5">
        <form onSubmit={handleUpdateProfile}>
          <div className="d-flex justify-content-center rounded-2 mb-4">
            <div className="form-profile w-100">
              <div className="form-group">
                <label className="text-muted f-10 mb-1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User Name"
                  value={userData.firstname}
                  onChange={(e) =>
                    setUserData({ ...userData, firstname: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="text-muted f-10 mb-1">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User Name"
                  value={userData.lastname}
                  onChange={(e) =>
                    setUserData({ ...userData, lastname: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="text-muted f-10 mb-1">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  value={userData.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label className="text-muted f-10 mb-1">Address</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="btn btn-danger btn-block osahanbus-btn rounded-1"
                >
                  UPDATE PROFILE
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>{" "}
    </div>
  );
};

export default ProfilePage;
