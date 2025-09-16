import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

interface TableProps {
  sheetId: string;
}

interface TableData {
  id: string | number;
  [key: string]: string | number | null; // for dynamic columns
}

const columnHelper = createColumnHelper<TableData>();

export const CollaborativeTable: React.FC<TableProps> = ({ sheetId }) => {
  const [data, setData] = useState<TableData[]>([]);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);

  useEffect(() => {
    // 初始化 Yjs document
    const doc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1234',
      sheetId,
      doc
    );

    // 創建共享數據結構
    const yarray = doc.getArray('data');

    // 設置初始數據
    if (yarray.length === 0) {
      yarray.push([{ id: '1', name: '新行' }]);
    }

    // 監聽數據變化
    yarray.observe(() => {
      const newData = yarray.toArray() as TableData[];
      console.log('Data updated:', newData);
      setData(newData);
    });

    setYdoc(doc);
    return () => {
      wsProvider.destroy();
      doc.destroy();
    };
  }, [sheetId]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: '名稱',
        cell: (info) => (
          <input
            value={info.getValue() as string || ''}
            onChange={(e) => {
              const yarray = ydoc?.getArray('data');
              if (yarray) {
                const rowIndex = info.row.index;
                const currentData = yarray.toArray() as TableData[];
                currentData[rowIndex] = {
                  ...currentData[rowIndex],
                  name: e.target.value,
                };
                yarray.delete(0, yarray.length);
                yarray.push(currentData);
              }
            }}
            className="w-full p-1 border rounded"
          />
        ),
      })
    ],
    [ydoc]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};