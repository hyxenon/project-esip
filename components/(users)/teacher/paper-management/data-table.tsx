"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationTable from "../../admin/school-management/tables/paginationTable";

// Debounce utility to delay the URL query updates
const useDebouncedFunction = (func: Function, delay: number) => {
  return useMemo(() => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, [func, delay]);
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type?: string;
  authorSearchParams?: string;
  authorSearchValue?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
  authorSearchParams,
  authorSearchValue,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [authorSearch, setAuthorSearch] = useState(
    authorSearchParams === "true"
  );
  const [authorSearchTerm, setAuthorSearchTerm] = useState(
    authorSearchValue || ""
  );
  const router = useRouter();

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

  // Memoize the query parameter update function with stable dependencies
  const updateQueryParams = useDebouncedFunction(
    (newParams: Record<string, string>) => {
      const currentParams = new URLSearchParams(window.location.search);

      let hasChanged = false;
      for (const key in newParams) {
        if (currentParams.get(key) !== newParams[key]) {
          currentParams.set(key, newParams[key]);
          hasChanged = true;
        }
      }

      if (!hasChanged) return;

      const updatedQueryString = currentParams.toString();

      const pathname =
        type === "admin"
          ? "/admin/research-management"
          : "/teacher/paper-management";

      router.replace(`${pathname}?${updatedQueryString}`);
    },
    300
  );

  // Handle author search input change
  const handleAuthorSearchInput = useCallback(
    (value: string) => {
      setAuthorSearchTerm(value); // Update input value immediately for fast typing
      updateQueryParams({ authorSearchTerm: value }); // Debounced URL update
    },
    [updateQueryParams] // Include the updateQueryParams function as a dependency
  );

  // Handle category filter change
  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      updateQueryParams({ category: value });
    },
    [updateQueryParams] // Include the updateQueryParams function as a dependency
  );

  // Handle author search checkbox toggle
  const handleAuthorSearchChange = useCallback(
    (isChecked: boolean) => {
      setAuthorSearch(isChecked);
      updateQueryParams({ authorSearch: isChecked ? "true" : "false" });
    },
    [updateQueryParams] // Include the updateQueryParams function as a dependency
  );

  const handleYearChange = useCallback(
    (value: string) => {
      setYear(value);
      updateQueryParams({ year: value });
    },
    [updateQueryParams] // Include updateQueryParams as a dependency
  );

  return (
    <>
      <div className="flex items-center py-4">
        <div className="flex flex-col gap-1 md:flex-row">
          {authorSearch ? (
            <Input
              placeholder="Search Author..."
              className="max-w-sm"
              value={authorSearchTerm}
              onChange={(e) => handleAuthorSearchInput(e.target.value)} // Debounced search term update
            />
          ) : (
            <Input
              placeholder="Search Paper..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}

          <div className="flex flex-col gap-2 md:flex-row">
            <Select defaultValue="all" onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>School Year</SelectLabel>
                  <SelectItem value="all">All Year</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select defaultValue="all" onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="all">All Category</SelectItem>
                  <SelectItem value="life">Life Science</SelectItem>
                  <SelectItem value="physical">Physical Science</SelectItem>
                  <SelectItem value="expo">Science Innovation Expo</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                  <SelectItem value="mathematical">
                    Mathematical and Computational
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="author"
                checked={authorSearch}
                onCheckedChange={handleAuthorSearchChange}
              />
              <label
                htmlFor="author"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Author Search
              </label>
            </div>
          </div>
        </div>

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
