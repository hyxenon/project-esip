import { columns } from "./tables/schoolTable/columns";
import { DataTable } from "./tables/schoolTable/data-table";

const SchoolForm = () => {
  const data = [
    {
      id: "1",
      name: "Munoz National High School",
      email: "mnh@gmail.com",
      status: "active",
      image:
        "https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/301052019_467021758769134_3797443194634141346_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ciu093elAIgQ7kNvgFl-QKq&_nc_ht=scontent.fmnl17-1.fna&oh=00_AYDXpTXftuvqMufTMzWKW-WJUm2ve6-eiLBxGHXdw6IWhg&oe=669E7C27",
    },
  ];
  return (
    <section className="w-full">
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default SchoolForm;
