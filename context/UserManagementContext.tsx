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
  users: User[];
  selectedSchool: string;
  role: string;
};

type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "EDIT_USER"; payload: User }
  | { type: "SET_SELECTED_SCHOOL"; payload: string }
  | { type: "SET_ROLE"; payload: string };

const initialState: State = {
  users: [],
  selectedSchool: "all",
  role: "",
};

const UserManagementContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const userManagementReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return {
        ...state,
        users: [
          ...state.users,
          { ...action.payload, school: action.payload.school || null },
        ],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "SET_SELECTED_SCHOOL":
      return { ...state, selectedSchool: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export const UserManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(userManagementReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      let users: User[] = []; // Initialize as an empty array

      try {
        if (state.role === "TEACHER") {
          users = await getAllUsersByTeacher(state.selectedSchool);
        } else if (state.role === "STUDENT") {
          users = await getAllUsersByStudent(state.selectedSchool);
        }

        dispatch({ type: "SET_USERS", payload: users });
      } catch (error) {
        console.error("Error fetching users:", error);
        // Optionally, you might want to dispatch an error action here
      }
    };

    fetchData();
  }, [state.selectedSchool, state.role]);

  return (
    <UserManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagementContext = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error(
      "useUserManagementContext must be used within a UserManagementProvider"
    );
  }
  return context;
};
