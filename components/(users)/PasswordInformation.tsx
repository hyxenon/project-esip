"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PasswordInformation = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Current Password</Label>
        <Input className="max-w-[500px]" />
      </div>
      <div>
        <Label>New Password</Label>
        <Input className="max-w-[500px]" />
      </div>
      <div>
        <Label>Confirm Password</Label>
        <Input className="max-w-[500px]" />
      </div>
      <Button size={"sm"} className="bg-[#BC6C25] hover:bg-[#DDA15E]">
        Save
      </Button>
    </div>
  );
};

export default PasswordInformation;
