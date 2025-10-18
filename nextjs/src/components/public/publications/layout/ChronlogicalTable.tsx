"use client";

import { capitalizeAndDeslugify } from "@/lib/miscellaneous";
import AOS from "aos";
import Papa from "papaparse";
import { useEffect, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConcentrincLoading from "@/components/base/ConcentringLoading";

interface Data {
  [key: string]: number | string;
}

export default function ChronlogicalTable({ dataUrl }: { dataUrl: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [columns, setColumns] = useState<ColumnDef<Data, number | string>[]>(
    []
  );

  useEffect(() => {
    async function loadData() {
      Papa.parse<Data>(dataUrl, {
        download: true,
        header: true,
        complete: (results) => {
          const rows: Data[] = results.data;
          setData(rows.map((elt, index) => ({ id: index + 1, ...elt })));
          setColumns(
            results.meta.fields
              ? results.meta.fields.map((elt) => ({
                  accessoryKey: elt,
                  header: capitalizeAndDeslugify(elt),
                  cell: ({ row }) => {
                    return row.original[elt];
                  },
                }))
              : []
          );
          setLoading(false);
        },
      });
    }

    loadData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  return (
    <div className="relative overflow-x-auto w-full xl:max-w-[50%] mt-5">
      {loading ? (
        <ConcentrincLoading />
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-5 text-center text-sm  uppercase bg-primary/10 border-b border-gray-200 text-primary"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="odd:bg-white even:bg-primary/10  border-b border-gray-200"
                  >
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell.column.columnDef.cell);
                      return (
                        <TableCell
                          key={cell.id}
                          className="px-6 py-4 text-center"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
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
      )}
    </div>
  );
}
