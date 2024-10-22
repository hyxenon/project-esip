"use client";
import { FaHistory } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { PaperHistoryModel } from "@/models/models";
import { getPaperHistoryLog } from "@/actions/history.action";
import { Badge } from "./ui/badge";

const PaperHistory = () => {
  const [historyData, setHistoryData] = useState<PaperHistoryModel[]>();

  useEffect(() => {
    const fetchHistoryData = async () => {
      const data = await getPaperHistoryLog();
      setHistoryData(data);
    };

    fetchHistoryData();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <FaHistory className="text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>History Logs</DialogTitle>
        </DialogHeader>
        <div className="">
          <Table>
            <TableCaption>A list of Paper logs.</TableCaption>
            <TableHeader>
              <TableHead>Performed By</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Paper</TableHead>
              <TableHead>Date</TableHead>
            </TableHeader>
            {historyData?.map((history, index) => (
              <TableBody key={index}>
                <TableCell>{history.performedBy.name}</TableCell>
                <TableCell>
                  <Badge variant={"secondary"}>{history.action}</Badge>
                </TableCell>
                <TableCell>{history.targetPaperName}</TableCell>
                <TableCell>{history.createdAt.toDateString()}</TableCell>
              </TableBody>
            ))}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaperHistory;
