import { CollaborativeTable } from '@/components/table/Table';
import { TableToolbar } from '@/components/table/TableToolbar';
import prisma from '@/lib/prisma';

export default async function SheetPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const sheet = await prisma.sheet.findUnique({
    where: { id },
    include: {
      owner: true,
      accesses: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!sheet) {
    return <div>表格不存在</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">{sheet.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{sheet.description}</p>
        </div>
        
        <TableToolbar
          onAddRow={() => {}}
          onDeleteRow={() => {}}
          onCopyRow={() => {}}
          onImport={() => {}}
          onExport={() => {}}
        />
        
        <CollaborativeTable sheetId={sheet.id} />
      </div>
    </div>
  );
}