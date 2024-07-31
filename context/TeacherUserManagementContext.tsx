"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

import {
  getAllUsersByStudent,
  getAllUsersByTeacher,
} from "@/actions/userManagement";
import { SchoolModel } from "@/components/(users)/admin/school-management/SchoolForm";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";

export type UserModel = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string | null;
  school?: SchoolModel | null;
};

type State = {
  selectedSchool: string;
  role: string;
  teacherUsers: User[];
  studentUsers: User[];
  isLoading: boolean;
};

type Action =
  | { type: "SET_TEACHER_USERS"; payload: User[] }
  | { type: "SET_STUDENT_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "EDIT_USER"; payload: User }
  | { type: "SET_SELECTED_SCHOOL"; payload: string }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: State = {
  teacherUsers: [],
  studentUsers: [],
  selectedSchool: "",
  role: "",
  isLoading: true,
};

const TeacherUserManagementContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const userManagementReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TEACHER_USERS":
      return { ...state, teacherUsers: action.payload };
    case "SET_STUDENT_USERS":
      return { ...state, studentUsers: action.payload };
    case "ADD_USER":
      return {
        ...state,
        teacherUsers:
          action.payload.role === "TEACHER"
            ? [
                ...state.teacherUsers,
                { ...action.payload, school: action.payload.school || null },
              ]
            : state.teacherUsers,
        studentUsers:
          action.payload.role === "STUDENT"
            ? [
                ...state.studentUsers,
                { ...action.payload, school: action.payload.school || null },
              ]
            : state.studentUsers,
      };
    case "DELETE_USER":
      return {
        ...state,
        teacherUsers: state.teacherUsers.filter(
          (user) => user.id !== action.payload
        ),
        studentUsers: state.studentUsers.filter(
          (user) => user.id !== action.payload
        ),
      };
    case "EDIT_USER":
      return {
        ...state,
        teacherUsers: state.teacherUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        studentUsers: state.studentUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "SET_SELECTED_SCHOOL":
      return { ...state, selectedSchool: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const TeacherUserManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(userManagementReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherUsers = await getAllUsersByTeacher(state.selectedSchool);
        const studentUsers = await getAllUsersByStudent(state.selectedSchool);
        dispatch({ type: "SET_TEACHER_USERS", payload: teacherUsers });
        dispatch({ type: "SET_STUDENT_USERS", payload: studentUsers });
      } catch (error) {
        console.error("Error fetching users:", error);
        // Optionally, you might want to dispatch an error action here
      }
    };
    fetchData().then(() => {
      dispatch({ type: "SET_LOADING", payload: false });
    });
  }, [state.selectedSchool, state.role]);

  return (
    <TeacherUserManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </TeacherUserManagementContext.Provider>
  );
};

export const useTeacherUserManagementContext = () => {
  const context = useContext(TeacherUserManagementContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherUserManagementContext must be used within a TeacherUserManagementProvider"
    );
  }
  return context;
};
