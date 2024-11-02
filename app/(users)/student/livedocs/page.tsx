import { getDocuments } from "@/actions/room.action";
import { auth } from "@/auth";
import AddDocumentBtn from "@/components/(users)/student/AddDocumentBtn";
import { DeleteModal } from "@/components/(users)/student/DeleteModal";
import { Card } from "@/components/ui/card";

import { dateConverter } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoDocumentText } from "react-icons/io5";

const LiveDocs = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const roomDocuments = await getDocuments(session.user?.email || "");
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-xl">All documents</h3>
            <AddDocumentBtn
              userId={session.user?.id || ""}
              email={session.user?.email || ""}
            />
          </div>
          <Card className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li
                className="document-list-item hover:bg-slate-100 border"
                key={id}
              >
                <Link
                  href={`/student/livedocs/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="rounded-md p-2 ">
                    {/* <Image
                      src={"/assets/icons/doc.svg"}
                      alt="file"
                      width={40}
                      height={40}
                    /> */}
                    <IoDocumentText className="w-9 h-9 -ml-1 text-[#606C38]" />
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{metadata.title}</p>
                      <p className="text-sm text-[#BC6C25]">
                        Created about {dateConverter(createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </Card>
        </div>
      ) : (
        <Card className="document-list-empty">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={session.user?.id || ""}
            email={session.user?.email || ""}
          />
        </Card>
      )}
    </div>
  );
};

export default LiveDocs;
