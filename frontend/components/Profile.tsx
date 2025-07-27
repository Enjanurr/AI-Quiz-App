'use client'

import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface UserInfo {
  username: string;
  email: string;
  avatar: string | null;
}

const UserInfo = () => {
  const [data, setData] = useState<UserInfo | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [profilePhoto, setNewProfilePhoto] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/api/getprofile", { credentials: "include" });
      const profile = await res.json();
      if (res.ok) {
        setData(profile);
      } else if (res.status === 401) {
        setMessage("Unauthorized");
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    if (newUserName) formData.append("username", newUserName);
    if (newEmail) formData.append("email", newEmail);
    if (profilePhoto) formData.append("avatar", profilePhoto);

    try {
      const response = await fetch('/api/editprofile', {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.success || "Profile updated!");
        fetchUserInfo(); // re-fetch updated profile
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []); 

  return (
    <section className="flex justify-center px-4 py-8">
      <div className="bg-slate-600 text-white rounded-lg w-full max-w-3xl p-6 space-y-10">
        {/* Profile Display Section */}
        <div>
          <h1 className="font-main text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Personal Information
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center relative">
            {data?.avatar && !data.avatar.includes("avatar/default") ? (
  <>
    <img
      src={data.avatar}
      alt="Avatar"
      className="rounded-full w-24 h-24 object-cover"
    />
  

  </>
) : (
  <FaUserCircle size={100} className="mx-auto" />
)}

            </div>

            <div className="text-sm sm:text-base space-y-1 text-center sm:text-left">
              <p><span className="font-semibold">Username:</span> {data?.username}</p>
              <p><span className="font-semibold">Email:</span> {data?.email}</p>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold border-b border-slate-400 pb-2">
            Update Profile
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="text-center">
              <label className="inline-block bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-full text-sm font-medium cursor-pointer">
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNewProfilePhoto(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <label>
                <span className="block mb-1 text-sm">New Username</span>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 text-black"
                />
              </label>

              <label>
                <span className="block mb-1 text-sm">New Email</span>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 text-black"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4">
            {message && <span className="text-green-400 text-sm">{message}</span>}
            <button
              type="submit"
              className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-2 px-6 rounded-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserInfo;
