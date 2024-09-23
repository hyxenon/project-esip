import { getSchool, getSchools } from "@/actions/schoolManagement";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaAlignLeft } from "react-icons/fa6";
import MobileMenu from "@/components/(users)/admin/mobileMenu";

import UserTabs from "@/components/(users)/admin/user-management/UserTabs";
import SchoolSelect from "@/components/(users)/admin/user-management/SchoolSelect";
import {
  getAllUsersByStudent,
  getAllUsersByTeacher,
} from "@/actions/userManagement";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";
import TotalCards from "@/components/(users)/TotalCards";

import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const UserManagement = async ({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) => {
  const schoolsResponse = await getSchools();
  let teacherUsers: User[] = [];
  let studentUsers: User[] = [];
  let specificSchool;

  if (searchParams?.id === undefined) {
    const allTeacherUsersData = await getAllUsersByTeacher("all");
    const allStudentUsersData = await getAllUsersByStudent("all");
    teacherUsers = allTeacherUsersData;
    studentUsers = allStudentUsersData;
  } else {
    const specificUsersData = await getAllUsersByTeacher(searchParams.id);
    const specificStudentUsersData = await getAllUsersByStudent(
      searchParams.id
    );
    const specificSchoolData = await getSchool(searchParams.id);
    specificSchool = specificSchoolData?.message;
    teacherUsers = specificUsersData;
    studentUsers = specificStudentUsersData;
  }

  return (
    <div className="w-full h-screen px-4 md:px-8 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex lg:hidden mb-4" variant="ghost" size={"icon"}>
            <FaAlignLeft />
          </Button>
        </SheetTrigger>
        <MobileMenu role="ADMIN" />
      </Sheet>

      {/* Card Count */}
      <div className="flex gap-4 flex-wrap">
        <TotalCards
          cardTitle="Total Teachers"
          cardTotalNumber={teacherUsers.length}
        >
          <FaChalkboardTeacher className="h-5 w-5 text-[#283618]" />
        </TotalCards>
        <TotalCards
          cardTitle="Total Students"
          cardTotalNumber={studentUsers.length}
        >
          <PiStudentFill className="h-5 w-5 text-[#283618]" />
        </TotalCards>
      </div>
      <SchoolSelect schoolsData={schoolsResponse.message} />
      {/* Tabs */}
      <div className="flex gap-8 mt-8">
        <UserTabs
          specificSchool={specificSchool}
          teachers={teacherUsers}
          students={studentUsers}
        />
      </div>
    </div>
  );
};

export default UserManagement;
