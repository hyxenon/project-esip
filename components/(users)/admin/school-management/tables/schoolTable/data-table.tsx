"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState, useEffect } from "react";
import PaginationTable from "../paginationTable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filterType, setFilterType] = useState<"name" | "email">("name");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  const [nameFilterValue, setNameFilterValue] = useState<any>(
    table.getColumn("name")?.getFilterValue() ?? ""
  );
  const [emailFilterValue, setEmailFilterValue] = useState<any>(
    table.getColumn("email")?.getFilterValue() ?? ""
  );

  useEffect(() => {
    setNameFilterValue(table.getColumn("name")?.getFilterValue() ?? "");
    setEmailFilterValue(table.getColumn("email")?.getFilterValue() ?? "");
  }, [table]);

  const handleInputChange = (value: string) => {
    if (filterType === "name") {
      setNameFilterValue(value);
      table.getColumn("name")?.setFilterValue(value);
      setColumnFilters([{ id: "name", value }]);
    } else if (filterType === "email") {
      setEmailFilterValue(value);
      table.getColumn("email")?.setFilterValue(value);
      setColumnFilters([{ id: "email", value }]);
    }
  };

  const handleFilterTypeChange = (type: "name" | "email") => {
    setFilterType(type);

    if (type === "name") {
      setEmailFilterValue("");
      setColumnFilters([{ id: "name", value: nameFilterValue }]);
    } else if (type === "email") {
      setNameFilterValue("");
      setColumnFilters([{ id: "email", value: emailFilterValue }]);
    }
  };

  return (
    <>
      {/* Filter and Radio Group */}
      <div className="flex items-center py-4">
        <div className="flex items-center">
          {filterType === "name" ? (
            <Input
              placeholder="Filter name..."
              value={nameFilterValue}
              onChange={(event) => handleInputChange(event.target.value)}
              className="max-w-sm"
            />
          ) : (
            <Input
              placeholder="Filter emails..."
              value={emailFilterValue}
              onChange={(event) => handleInputChange(event.target.value)}
              className="max-w-sm"
            />
          )}

          <RadioGroup defaultValue="option-one" className="flex ml-4 w-full">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                onClick={() => handleFilterTypeChange("name")}
              />
              <Label htmlFor="option-one">Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                onClick={() => handleFilterTypeChange("email")}
              />
              <Label htmlFor="option-two">Email</Label>
            </div>
          </RadioGroup>
        </div>
        {/* Columns Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationTable
          table={table}
          pageIndex={table.options.state.pagination?.pageIndex}
        />
      </div>
    </>
  );
}
