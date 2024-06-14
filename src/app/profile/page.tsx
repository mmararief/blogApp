import { ProfileForm } from "@/components/Profile-form";
import React from "react";

const Profile = () => {
  return (
    <div className="mx-auto max-w-screen-md px-4 pb-6 pt-16">
      <div>
        <h3 className="text-xl font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground mb-2">
          This is how others will see you on the site.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default Profile;
