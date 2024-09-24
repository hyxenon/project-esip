import { getSchool } from "@/actions/schoolManagement";
import {
  getAllUsersByStudent,
  getAllUsersByTeacher,
  getPendingUsers,
} from "@/actions/userManagement";
import { auth } from "@/auth";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";
import TeacherUserTabList from "@/components/(users)/teacher/user-management/TeacherUserTabList";
import TotalCards from "@/components/(users)/TotalCards";
import Unauthorized from "@/components/UnAuthorized";
import { Users } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const UserManagement = async () => {
  const session = await auth();

  if (session?.user?.role !== "TEACHER") {
    return <Unauthorized />;
  }

  let teachersData: User[] = [];
  let studentsData: User[] = [];
  let pendingData: User[] = [];
  let specificSchool;

  if (session?.user?.schoolId) {
    const teachersResponse = await getAllUsersByTeacher(session.user.schoolId);
    const studentsResponse = await getAllUsersByStudent(session.user.schoolId);
    const pendingResponse = await getPendingUsers(session.user.schoolId);
    const specificSchoolData = await getSchool(session.user.schoolId);
    specificSchool = specificSchoolData?.message;
    teachersData = teachersResponse;
    studentsData = studentsResponse;
    pendingData = pendingResponse;
  }

  return (
    <div className="flex flex-col py-4 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:mt-4">
        User Management
      </h4>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 mt-4">
        <TotalCards
          cardTitle="Total Users"
          cardTotalNumber={teachersData.length + studentsData.length}
        >
          <Users className="h-5 w-5 text-[#283618]" />
        </TotalCards>
        <TotalCards
          cardTitle="Total Teachers"
          cardTotalNumber={teachersData.length}
        >
          <FaChalkboardTeacher className="h-5 w-5 text-[#283618]" />
        </TotalCards>
        <div className="col-span-2 lg:col-span-1">
          <TotalCards
            cardTitle="Total Students"
            cardTotalNumber={studentsData.length}
          >
            <PiStudentFill className="h-5 w-5 text-[#283618]" />
          </TotalCards>
        </div>
      </div>

      {/* Tables */}
      <TeacherUserTabList
        teachersData={teachersData}
        studentsData={studentsData}
        pendingData={pendingData}
        specificSchool={specificSchool}
      />
    </div>
  );
};

export default UserManagement;
