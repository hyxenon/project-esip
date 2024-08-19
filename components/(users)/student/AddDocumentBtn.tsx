"use client";

import { createDocument } from "@/actions/room.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addDocumentHandler = async () => {
    setLoading(true);
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/student/livedocs/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="bg-[#606C38] hover:bg-[#283618] flex gap-1 shadow-md"
      disabled={loading}
    >
      <Image src={"/assets/icons/add.svg"} alt="add" width={24} height={24} />
      <p className="hidden sm:block">
        {loading ? "loading..." : "Start a blank document"}
      </p>
    </Button>
  );
};

export default AddDocumentBtn;
