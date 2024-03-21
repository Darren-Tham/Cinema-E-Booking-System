"use client";
import InfoField from "@/components/InfoField";
import Link from "next/link";
import { useState } from "react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export default function EditProfile() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profileData: ProfileData = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    const response = await fetch(
      "http://localhost:8080/api/customer/edit-profile/{customerID}",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );

    if (response.ok) {
      console.log("Profile updated successfully");
    } else {
      console.error("Failed to update profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-black h-screen items-center justify-center"
    >
      <div className="flex flex-col p-8 bg-dark-jade items-center space-y-10 rounded-lg">
        <h1 className="text-white text-4xl font-sans font-semibold mt-6">
          Edit Profile
        </h1>
        <div className="flex items-end">
          <div className="w-36 h-36 rounded-full bg-white hover:scale-105 transition-transform duration-300">
            <img
              src="https://static.thenounproject.com/png/363633-200.png"
              alt="Profile Picture"
              width={144}
              height={144}
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-black hover:scale-105 transition-transform duration-300">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/352/965/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"
              alt="Add Profile Picture"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-6 w-96">
          <InfoField info="First Name" color="bg-light-jade">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InfoField>
          <InfoField info="Last Name" color="bg-emerald-50">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InfoField>
          <InfoField info="Email" color="bg-light-jade">
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </InfoField>
          <InfoField info="Password" color="bg-emerald-50">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InfoField>
          <InfoField info="Phone" color="bg-light-jade">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </InfoField>
        </div>
        <div className="flex gap-10">
          <Link href="/" className="back-button">
            Back Home
          </Link>
          <button type="submit" className="action-button">
            Confirm Changes
          </button>
        </div>
      </div>
    </form>
  );
}
