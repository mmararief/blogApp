import { ProfileForm } from "@/components/Profile-form";
import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl border-b p-2 border-gray-300 ">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="mx-auto max-w-screen-md px-4 pb-6 mt-6 ">
        <div>
          <h3 className="text-xl font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground mb-2">
            This is how others will see you on the site.
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
