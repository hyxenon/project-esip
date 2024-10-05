"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ProfileInformationProps {
  name: string;
  email: string;
}

const ProfileInformation = ({ name, email }: ProfileInformationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input className="max-w-[500px]" value={name} />
      </div>
      <div>
        <Label>Email</Label>
        <Input className="max-w-[500px]" value={email} />
      </div>
      <Button size={"sm"} className="bg-[#BC6C25] hover:bg-[#DDA15E]">
        Save
      </Button>
    </div>
  );
};

export default ProfileInformation;
