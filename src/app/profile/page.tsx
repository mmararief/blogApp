import { ProfileForm } from "@/components/Profile-form";
import React from "react";

const Profile = () => {
  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto my-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl border-b p-2 border-gray-300 ">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 pb-6 mt-6 ">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
