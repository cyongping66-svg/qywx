'use client';

import Image from "next/image";
import React from 'react';
import { CollaborativeTable } from '@/components/table/Table';
import { TableToolbar } from '@/components/table/TableToolbar';
import { useTableStore } from '@/stores/tableStore';
import { Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, CopyOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export default function Home() {
  const { selectedRows } = useTableStore();
  const sheetId = 'default-sheet';

  const handleAddRow = () => {
    console.log('Add row');
  };

  const handleDeleteRow = () => {
    console.log('Delete row');
  };

  const handleCopyRow = () => {
    console.log('Copy row');
  };

  const handleImport = () => {
    console.log('Import data');
  };

  const handleExport = () => {
    console.log('Export data');
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">协作电子表格应用</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TableToolbar 
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
            onCopyRow={handleCopyRow}
            onImport={handleImport}
            onExport={handleExport}
          />
          
          <div className="p-4">
            <CollaborativeTable sheetId={sheetId} />
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>当前选择行数: {selectedRows.length}</p>
          <p>工作表ID: {sheetId}</p>
        </div>
      </main>
    </div>
  );
}
