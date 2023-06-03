import { Button, Typography } from "@material-tailwind/react";
import { ProductWithAvgRatingAndCount } from "@pages/analytics/ratings";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";

import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

export function AvgProductRatingTable({
  products,
}: {
  products: ProductWithAvgRatingAndCount[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const tableRef = React.useRef(null);

  const { push } = useRouter();
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "avg-product-rating-table",
    sheet: "rating",
  });

  const columnHelper = createColumnHelper<ProductWithAvgRatingAndCount>();

  const columns = React.useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: "Назва продукту",
        cell: (item) => item.getValue(),
      }),
      columnHelper.accessor("averageRating", {
        header: "Середня оцінка",
        cell: (item) => item.getValue().toFixed(2).replace(".", ","),
      }),
      columnHelper.accessor("ratingCount", {
        header: "Кількість оцінок",
        cell: (item) => item.getValue(),
      }),
    ];
  }, [columnHelper]);

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div>
      <table ref={tableRef} width="100%">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left whitespace-nowrap">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-2 bg-primary-blue text-white"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                onClick={() => push(`/product/${row.original.tag}`)}
                className="hover:bg-primary-blue hover:text-white cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-2 font-normal">
                      <Typography className="font-medium">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Typography>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button onClick={onDownload} className="mt-4">
          Завантажити Excel
        </Button>
      </div>
    </div>
  );
}

export default AvgProductRatingTable;
