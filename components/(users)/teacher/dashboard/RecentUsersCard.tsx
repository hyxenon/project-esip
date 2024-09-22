import { getRecentUsers } from "@/actions/teacherDashboard.action";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentUserCard from "../../RecentUserCard";

const RecentUsersCard = async () => {
  const session = await auth();
  const { recentTeachers, recentStudents } = await getRecentUsers(
    session?.user?.schoolId!
  );
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Recent Users
        </CardTitle>
        <CardDescription>Recent Users in 3 months.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Tabs defaultValue="teachers" className="">
          <TabsList className=" w-full">
            <TabsTrigger value="teachers" className="w-full">
              Teachers
            </TabsTrigger>
            <TabsTrigger value="students" className="w-full">
              Students
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="h-full space-y-4">
            {recentTeachers.map((teacher) => (
              <RecentUserCard
                key={teacher.id}
                name={teacher.name!}
                image={teacher.image!}
                email={teacher.email!}
              />
            ))}
          </TabsContent>
          <TabsContent value="students" className="h-full space-y-4">
            {recentStudents.map((teacher) => (
              <RecentUserCard
                key={teacher.id}
                name={teacher.name!}
                image={teacher.image!}
                email={teacher.email!}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecentUsersCard;
