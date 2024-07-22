"use client";
import { SchoolModel } from "@/components/(users)/admin/school-management/SchoolForm";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

type State = {
  schools: SchoolModel[];
};

type Action =
  | { type: "SET_SCHOOLS"; payload: SchoolModel[] }
  | { type: "ADD_SCHOOL"; payload: SchoolModel }
  | { type: "DELETE_SCHOOL"; payload: string }
  | { type: "EDIT_SCHOOL"; payload: SchoolModel };

const initialState: State = {
  schools: [],
};

const SchoolContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const schoolReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SCHOOLS":
      return { ...state, schools: action.payload };
    case "ADD_SCHOOL":
      return { ...state, schools: [...state.schools, action.payload] };
    case "DELETE_SCHOOL":
      return {
        ...state,
        schools: state.schools.filter((school) => school.id !== action.payload),
      };
    case "EDIT_SCHOOL":
      return {
        ...state,
        schools: state.schools.map((school) =>
          school.id === action.payload.id ? action.payload : school
        ),
      };
    default:
      return state;
  }
};

export const SchoolProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(schoolReducer, initialState);
  return (
    <SchoolContext.Provider value={{ state, dispatch }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchoolContext must be used within a SchoolProvider");
  }
  return context;
};
