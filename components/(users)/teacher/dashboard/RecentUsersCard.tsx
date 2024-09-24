import { getRecentUsers } from "@/actions/teacherDashboard.action";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentUserCard from "../../RecentUserCard";
import { Session } from "next-auth";

const RecentUsersCard = async ({ session }: { session: Session }) => {
  const { recentTeachers, recentStudents } = await getRecentUsers(
    session?.user?.schoolId!
  );

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Recent Users
        </CardTitle>
        <CardDescription>Users added in the last 3 months.</CardDescription>
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

          {/* Teachers Tab Content */}
          <TabsContent value="teachers" className="h-full space-y-5 mt-4">
            {recentTeachers.length === 0 ? (
              <p className="text-gray-500 text-center">No teachers found.</p>
            ) : (
              recentTeachers.map((teacher) => (
                <RecentUserCard
                  key={teacher.id}
                  name={teacher.name!}
                  image={teacher.image!}
                  email={teacher.email!}
                  createdAt={teacher.createdAt}
                />
              ))
            )}
          </TabsContent>

          {/* Students Tab Content */}
          <TabsContent value="students" className="h-full space-y-4">
            {recentStudents.length !== 0 ? (
              <p className="text-gray-500 text-center mt-8">
                No students found.
              </p>
            ) : (
              recentStudents.map((student) => (
                <RecentUserCard
                  key={student.id}
                  name={student.name!}
                  image={student.image!}
                  email={student.email!}
                  createdAt={student.createdAt}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecentUsersCard;
