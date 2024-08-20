import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getUserPosts, updateUserData } from "../services/userServices";

const Profile = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: user ? user.fullname : "",
    email: user ? user.email : "",
    // profilePicture:
    //   user && user.profilePic ? user.profilePic : "/profilePicture.jpg", // Replace with actual profile picture URL
  });
  const [profilePic, setProfilePic] = useState(
    user && user.profilePic ? user.profilePic : "/profilePicture.jpg"
  );
  console.log("user is ", user);
  const [posts, setPosts] = useState([]);
  console.log("profile pic is ", profilePic);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getUserPosts(id);
        setPosts(res.data.data);
      } catch (error) {
        console.log("Failed to fetch Posts: ", error);
      }
    };
    fetchPosts();
  }, [id]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   // Implement file upload logic here (using multer or similar on backend)
  //   setProfileData({
  //     ...profileData,
  //     profilePicture: URL.createObjectURL(file),
  //   });
  // };

  const formData = new FormData();
  formData.append("fullname", profileData.fullname);
  // formData.append("email", content);

  if (profilePic) {
    formData.append("profilePic", profilePic);
  }

  const handleSave = async () => {
    // Implement save logic (e.g., send data to the backend)
    console.log("Profile pic data before save", formData.profilePic);
    try {
      const response = await updateUserData(id, formData);
      setUser({
        ...user,
        profilePic: response.data.data.profilePic,
        fullname: response.data.data.fullname,
      });
      setProfilePic(response.data.data.profilePic);
      // setProfileData({ ...profileData, fullname: response.data.data.fullname });
      console.log("successfully updated data");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-cusLightBG p-6 rounded-lg shadow-md dark:bg-cusDarkBG">
        <div className="text-center">
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full h-32 w-32 mx-auto mb-4"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              //onChange={handleProfilePictureChange}
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="mb-4"
            />
          )}
          <h2 className="text-2xl font-semibold text-cusPrimaryColor dark:text-cusSecondaryColor">
            {user.fullname}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="mt-6">
          {editMode ? (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="username"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={profileData.fullname}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-cusLightDarkBG dark:text-gray-200"
                />
              </div>
              {/* <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-cusLightDarkBG dark:text-gray-200"
                />
              </div> */}
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cusPrimaryColor text-white rounded hover:bg-cusSecondaryColor"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="ml-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-cusPrimaryColor text-white rounded hover:bg-cusSecondaryColor"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-cusPrimaryColor dark:text-cusSecondaryColor mb-4">
          Your Posts
        </h3>
        {/* Here you can map through the user's posts and display them */}
        {/* Display the user's posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-cusLightBG p-4 rounded shadow-md dark:bg-cusLightDarkBG"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h4 className="text-lg font-semibold text-cusPrimaryColor dark:text-cusSecondaryColor">
                  {post.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.content.substring(0, 100)}...
                </p>
                <button className="mt-2 px-4 py-2 bg-cusSecondaryColor text-white rounded hover:bg-cusSecondaryLightColor">
                  Edit Post
                </button>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
