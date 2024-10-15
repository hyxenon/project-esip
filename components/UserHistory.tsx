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
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { UserHistoryModel } from "@/models/models";
import { getUserHistoryLog } from "@/actions/history.action";
import { Badge } from "./ui/badge";

const UserHistoryDialog = () => {
  const [historyData, setHistoryData] = useState<UserHistoryModel[]>();

  useEffect(() => {
    const fetchHistoryData = async () => {
      const data = await getUserHistoryLog();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>History Logs</DialogTitle>
        </DialogHeader>
        <div className="">
          <Table>
            <TableCaption>A list of user logs.</TableCaption>
            <TableHeader>
              <TableHead>Performed By</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target User</TableHead>
              <TableHead>Date</TableHead>
            </TableHeader>
            {historyData?.map((history, index) => (
              <TableBody key={index}>
                <TableCell>{history.performedBy.name}</TableCell>
                <TableCell>
                  <Badge variant={"secondary"}>{history.action}</Badge>
                </TableCell>
                <TableCell>{history.targetName}</TableCell>
                <TableCell>{history.createdAt.toDateString()}</TableCell>
              </TableBody>
            ))}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserHistoryDialog;
