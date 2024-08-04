import { getDocuments } from "@/actions/room.action";
import { auth } from "@/auth";
import AddDocumentBtn from "@/components/(users)/student/AddDocumentBtn";

import { dateConverter } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LiveDocs = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const roomDocuments = await getDocuments(session.user?.email || "");
  return (
    <div className="flex flex-col justify-center items-center">
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={session.user?.id || ""}
              email={session.user?.email || ""}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li className="document-list-item" key={id}>
                <Link
                  href={`/student/livedocs/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md p-2 sm:block">
                    <Image
                      src={"/assets/icons/doc.svg"}
                      alt="file"
                      width={40}
                      height={40}
                    />
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{metadata.title}</p>
                      <p className="text-sm font-light text-blue-400">
                        Created about {dateConverter(createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* TODO: DELETE BUTTON */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
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
        </div>
      )}
    </div>
  );
};

export default LiveDocs;
