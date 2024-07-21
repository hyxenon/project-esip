"use client";
import { useEffect, useState } from "react";
import { columns } from "./tables/schoolTable/columns";
import { DataTable } from "./tables/schoolTable/data-table";
import { getSchools } from "@/actions/schoolManagement";

export interface SchoolModel {
  email: string;
  schoolName: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  image: string | null;
  contactNumber: string;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolForm = () => {
  const [schoolsData, setSchoolsData] = useState<SchoolModel[]>([]);

  // const schoolsDatas = [
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  //   {
  //     email: "mnhs@gmail.com",
  //     schoolName: "Munoz Nationa High School",
  //     streetAddress: "1",
  //     city: "nueva ecija",
  //     province: "nueva ecija",
  //     postalCode: "1",
  //     image:
  //       "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/307770129_469564551895133_3140458163240407198_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EUpyLGX43ZsQ7kNvgGX7JCY&_nc_ht=scontent.fmnl17-5.fna&oh=00_AYCQhqbFhWLWge4UYu5CpHgqJYaB7S-JWW8vEdQDgNhqGg&oe=66A02D48",
  //     contactNumber: "1",
  //     id: "1",
  //     status: "Active",
  //     createdAt: "1",
  //     updatedAt: "2",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSchools();
      setSchoolsData(res.message);
    };

    fetchData();
  }, []);
  return (
    <section className="w-full">
      <div className="">
        {schoolsData != undefined ? (
          <DataTable columns={columns} data={schoolsData} />
        ) : (
          <p>No Data</p>
        )}
      </div>
    </section>
  );
};

export default SchoolForm;
