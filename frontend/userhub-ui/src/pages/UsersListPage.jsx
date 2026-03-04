import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getAllUsers, deleteUser } from '../services/userService';
import ConfirmModal from '../components/ConfirmModal';

function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: parseInt(localStorage.getItem('pageSize')) || 5 });
  const [globalFilter, setGlobalFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers({ signal: controller.signal });
        setUsers(response.data);
      } catch (err) {
        if (err.name !== 'CanceledError') console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    return () => controller.abort();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(pendingDeleteId);
      setUsers((prev) => prev.filter((u) => u.id !== pendingDeleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'surname',
      header: 'Surname',
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <button
          className="py-2 px-4 rounded-lg border-0 cursor-pointer text-sm font-medium bg-[#f38ba8] text-[#1e1e2e] hover:bg-[#eba0af] transition-colors shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setPendingDeleteId(row.original.id);
          }}
        >
          Delete
        </button>
      ),
    },
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, pagination, globalFilter },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      {pendingDeleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="py-2 px-4 rounded-lg border-0 cursor-pointer text-sm font-medium bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] transition-colors"
            >
              ← Back
            </button>
            <h2 className="text-3xl font-bold text-[#cdd6f4] m-0">Users</h2>
          </div>
          <button
            className="py-2.5 px-6 rounded-lg border-0 cursor-pointer text-sm font-semibold bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#b4d0fb] transition-colors shadow-md"
            onClick={() => navigate('/register')}
          >
            + Register New User
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e2e] rounded-2xl border border-[#313244] overflow-hidden shadow-lg">
        <div className="px-6 pt-6 pb-4 border-b border-[#313244]">
          <input
            type="text"
            placeholder="Search by name or surname..."
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setPageIndex(0);
            }}
            className="w-full py-2.5 px-4 bg-[#313244] text-[#cdd6f4] border border-[#45475a] rounded-lg text-sm focus:outline-none focus:border-[#89b4fa] placeholder-[#585b70]"
          />
        </div>

        {loading && <p className="text-[#6c7086] p-8 text-center">Loading...</p>}

        {!loading && users.length === 0 && (
          <p className="text-[#6c7086] italic p-8 text-center">No users found.</p>
        )}

        {!loading && users.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="py-4 px-6 text-left bg-[#181825] text-[#89b4fa] text-xs uppercase tracking-widest font-bold select-none"
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={() => window.open(`/users/${row.original.id}`, '_blank')}
                  className={`cursor-pointer transition-colors hover:bg-[#2a2a3c] ${i % 2 === 0 ? 'bg-[#1e1e2e]' : 'bg-[#24243a]'}`}
                  title="Click to view details"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-6 text-left border-b border-[#313244] text-[#cdd6f4] text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && users.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#313244] bg-[#181825]">
            <span className="text-[#6c7086] text-sm font-medium">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length}
            </span>
            <div className="flex items-center gap-3">
              <button className="py-1.5 px-3 text-sm rounded-lg border-0 cursor-pointer bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>«</button>
              <button className="py-1.5 px-3 text-sm rounded-lg border-0 cursor-pointer bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
              <span className="text-[#cdd6f4] text-sm font-medium px-2">Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
              <button className="py-1.5 px-3 text-sm rounded-lg border-0 cursor-pointer bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
              <button className="py-1.5 px-3 text-sm rounded-lg border-0 cursor-pointer bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>»</button>
              <select
                className="bg-[#313244] text-[#cdd6f4] border border-[#45475a] rounded-lg py-1.5 px-3 text-sm cursor-pointer hover:border-[#89b4fa] transition-colors"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  const size = Number(e.target.value);
                  localStorage.setItem('pageSize', size);
                  table.setPageSize(size);
                }}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>Show {size}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersListPage;