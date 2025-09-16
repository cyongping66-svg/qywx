import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';

interface ToolbarProps {
  onAddRow: () => void;
  onDeleteRow: () => void;
  onCopyRow: () => void;
  onImport: () => void;
  onExport: () => void;
}

export const TableToolbar: React.FC<ToolbarProps> = ({
  onAddRow,
  onDeleteRow,
  onCopyRow,
  onImport,
  onExport,
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <Space size="middle">
        <Tooltip title="新增列">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddRow}
          >
            新增
          </Button>
        </Tooltip>
        <Tooltip title="刪除選中列">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={onDeleteRow}
          >
            刪除
          </Button>
        </Tooltip>
        <Tooltip title="複製選中列">
          <Button
            icon={<CopyOutlined />}
            onClick={onCopyRow}
          >
            複製
          </Button>
        </Tooltip>
        <div className="border-l border-gray-300 h-6 mx-2" />
        <Tooltip title="匯入數據">
          <Button
            icon={<UploadOutlined />}
            onClick={onImport}
          >
            匯入
          </Button>
        </Tooltip>
        <Tooltip title="匯出數據">
          <Button
            icon={<DownloadOutlined />}
            onClick={onExport}
          >
            匯出
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};