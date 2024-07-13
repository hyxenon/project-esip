import { columns } from "./schoolTable/columns";
import { DataTable } from "./schoolTable/data-table";

const SchoolForm = () => {
  const data = [
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHS",
      email: "mnh@gmail.com",
      status: "active",
      image: "2",
    },
    {
      id: "1",
      name: "MNHSssss",
      email: "amnh@gmail.com",
      status: "active",
      image: "2",
    },
  ];
  return (
    <section className="w-full">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">All Schools</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default SchoolForm;
