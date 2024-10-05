import { auth } from "@/auth";
import PasswordInformation from "@/components/(users)/PasswordInformation";
import ProfileInformation from "@/components/(users)/ProfileInformation";
import ProfilePictureInformation from "@/components/(users)/ProfilePictureInformation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    return <div>no session found</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:container mt-8 space-y-4">
        <ProfilePictureInformation
          imgURL={
            session.user.image
              ? session.user.image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${session.user.name}`
          }
          session={session}
        />
        <Card className="rounded-none md:rounded-xl bg-white shadow-md px-0">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account's profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileInformation
              name={session.user.name!}
              email={session.user.email!}
            />
          </CardContent>
        </Card>
        <Card className="rounded-none md:rounded-xl bg-white shadow-md px-0">
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordInformation />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
