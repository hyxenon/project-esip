import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type AuthFormWrapperProps = {
  children: React.ReactNode;
  title: string;
  backBtnRef: string;
  backBtnLabel: string;
};

const AuthFormWrapper = ({
  children,
  title,
  backBtnRef,
  backBtnLabel,
}: AuthFormWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] px-4 py-8">
      <CardHeader>
        <CardTitle className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 uppercase">
          {/* <img
            src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHd0toFbR8_sty00mdow2u9vpdT8fDHPTq-l1Px8Mc9Ons-zoQ9g-pTwO8Aj6kpAbxxg71cNjxW331FU9lX4dI3&_nc_ohc=vX1xujS8NRQAX_lxP5d&_nc_ht=scontent.fmnl17-5.fna&oh=00_AfCGU7oWSUYHnPMuZXQsq3gx-H_obfWRpzh3DO0xHQHwjw&oe=65FCB348"
            alt="logo"
            className="w-20 h-20 mx-auto"
          /> */}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <Button variant="link" className="mx-auto">
          <Link href={backBtnRef}>{backBtnLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
