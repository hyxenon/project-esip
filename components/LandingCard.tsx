import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const LandingCard = () => {
  return (
    <Card className="bg-white z-10">
      <CardHeader>
        <CardTitle>Research Library</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a card content</p>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button>View more</Button>
      </CardFooter>
    </Card>
  );
};

export default LandingCard;
