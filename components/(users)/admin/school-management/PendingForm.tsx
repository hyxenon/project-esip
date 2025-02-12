import { columns } from "./tables/pendingTable/columns";
import { DataTable } from "./tables/pendingTable/data-table";

const PendingForm = () => {
  const data = [
    {
      id: "1",
      name: "Pending Test High School",
      email: "pendingtest@gmail.com",
      image: "2",
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

export default PendingForm;
