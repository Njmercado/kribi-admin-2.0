'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserDTO } from '@/models';
import { IconButton } from '@/components/atom/IconButton';
import { useHaveAccess } from '@/hooks';

export interface UsersTableProps {
  users: UserDTO[];
  hasNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
  onEditClick: (user: UserDTO) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UsersTable({
  users,
  hasNextPage,
  isLoading,
  isError,
  page,
  limit,
  onEditClick,
  onPageChange,
  onRowsPerPageChange,
}: UsersTableProps) {

  const { haveAccess } = useHaveAccess();

  return (
    <TableContainer component={Paper} elevation={0} className="rounded-xl border border-gray-100">
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead className="bg-gray-50/50">
          <TableRow>
            <TableCell className="font-semibold text-text-secondary">ID</TableCell>
            <TableCell className="font-semibold text-text-secondary">Full Name</TableCell>
            <TableCell className="font-semibold text-text-secondary">Email</TableCell>
            <TableCell className="font-semibold text-text-secondary">Username</TableCell>
            <TableCell className="font-semibold text-text-secondary">Role</TableCell>
            <TableCell className="font-semibold text-text-secondary">Status</TableCell>
            <TableCell align="center" className="font-semibold text-text-secondary">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} align="center" className="py-8 text-text-secondary">
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={7} align="center" className="py-8 text-text-secondary">
                Error loading users. Please try again.
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user: UserDTO) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-50/30 transition-colors"
              >
                <TableCell className="text-text-secondary">{user.id}</TableCell>
                <TableCell component="th" scope="row" className="font-medium text-text-primary">
                  {user.full_name}
                </TableCell>
                <TableCell className="text-text-secondary">{user.email}</TableCell>
                <TableCell className="text-text-secondary">{user.username}</TableCell>
                <TableCell>
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${user.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-1">
                    <IconButton onClick={() => onEditClick(user)}>
                      <EditIcon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" className="py-8 text-text-secondary">
                No users found. Try a different search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={-1}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        slotProps={{
          actions: {
            nextButton: { disabled: !hasNextPage },
          },
        }}
      />
    </TableContainer>
  );
}
