import { getSchool } from "@/actions/schoolManagement";
import {
  getAllUsersByStudent,
  getAllUsersByTeacher,
  getPendingUsers,
} from "@/actions/userManagement";
import { auth } from "@/auth";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";
import TotalStudents from "@/components/(users)/teacher/user-management/cards/totalStudents";
import TotalTeachers from "@/components/(users)/teacher/user-management/cards/totalTeachers";
import TotalUsers from "@/components/(users)/teacher/user-management/cards/totalUsers";
import TeacherUserTabList from "@/components/(users)/teacher/user-management/TeacherUserTabList";

const UserManagement = async () => {
  const session = await auth();
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
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight lg:mt-4">
        User Management
      </h4>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 mt-2">
        <TotalUsers />
        <TotalTeachers />
        <div className="col-span-2 lg:col-span-1">
          <TotalStudents />
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
