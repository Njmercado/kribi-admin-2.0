'use client';

import { useState, useEffect } from "react";
import { useHaveAccess, useAlert, AlertType } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType, UserSearchType, UserActionsMessages } from "@/contants";
import { UsersTable, EditUserDrawer } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { UserDTO, UserUpdateDTO } from "@/models";
import { DrawerDirection } from "@/components/atom/drawer";
import {
  useLazySearchUserQuery,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useUpdateUserMutation,
} from "@/libs/store/api/userApiSlice";

export default function Users() {
  const { haveAccess } = useHaveAccess();
  const { goHome } = useCustomRouter();

  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<UserSearchType>(UserSearchType.NAME);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Edit drawer state
  const [editingUser, setEditingUser] = useState<UserDTO | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  // Lazy queries
  const [searchUser] = useLazySearchUserQuery();

  // Mutations
  const [deleteUserRequest] = useDeleteUserMutation();
  const [restoreUserRequest] = useRestoreUserMutation();
  const [updateUserRequest] = useUpdateUserMutation();

  const { openAlert, Toast } = useAlert();

  useEffect(() => {
    if (!haveAccess(Action.VIEW_USERS as ActionType)) {
      goHome();
    }
  }, [haveAccess, goHome]);

  // --- Search handler ---
  async function handleOnSearch() {
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setIsError(false);
    setUsers([]);

    try {
      const result = await searchUser({ value: searchInput, page, limit }).unwrap();

      // Normalize to array
      if (result) {
        setUsers(Array.isArray(result.users) ? result.users : []);
        setHasNextPage(result.has_next_page);
      } else {
        setUsers([]);
        setHasNextPage(false);
      }
    } catch {
      setIsError(true);
      openAlert(UserActionsMessages.USER_NOT_FOUND, AlertType.ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setPage(1);
      handleOnSearch();
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Re-fetch when page or limit changes
  useEffect(() => {
    if (searchInput.trim()) {
      handleOnSearch();
    }
  }, [page, limit]);

  // --- Edit handlers ---
  function handleEditClick(user: UserDTO) {
    setEditingUser(user);
    setIsEditDrawerOpen(true);
  }

  async function handleSaveEdit(updatedUser: UserUpdateDTO) {
    try {
      const response = await updateUserRequest(updatedUser).unwrap();
      setIsEditDrawerOpen(false);
      setEditingUser(null);
      // Update local state with the new data
      setUsers(prev => prev.map(u => u.id === response.id ? response : u));
      openAlert(UserActionsMessages.USER_UPDATED_SUCCESSFULLY, AlertType.SUCCESS);
    } catch {
      openAlert(UserActionsMessages.USER_COULD_NOT_BE_UPDATED, AlertType.ERROR);
    }
  }

  // --- Delete handler ---
  async function handleDeleteClick(user: UserDTO) {
    const confirmed = window.confirm(`Are you sure you want to deactivate user "${user.full_name}"?`);
    if (!confirmed) return;

    try {
      await deleteUserRequest(user.id).unwrap();
      // Update local state
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: false } : u));
      openAlert(UserActionsMessages.USER_DELETED_SUCCESSFULLY, AlertType.SUCCESS);
    } catch {
      openAlert(UserActionsMessages.USER_COULD_NOT_BE_DELETED, AlertType.ERROR);
    }
  }

  // --- Restore handler ---
  async function handleRestoreClick(user: UserDTO) {
    const confirmed = window.confirm(`Are you sure you want to restore user "${user.full_name}"?`);
    if (!confirmed) return;

    try {
      const response = await restoreUserRequest(user.id).unwrap();
      setUsers(prev => prev.map(u => u.id === user.id ? response : u));
      openAlert(UserActionsMessages.USER_RESTORED_SUCCESSFULLY, AlertType.SUCCESS);
    } catch {
      openAlert(UserActionsMessages.USER_COULD_NOT_BE_RESTORED, AlertType.ERROR);
    }
  }

  const searchTypeOptions = Object.values(UserSearchType);

  return (
    <main className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Users Management</h1>
        <p className="text-text-secondary">Search, view and manage administrator accounts</p>
      </section>

      <section className="flex flex-col sm:flex-row items-end gap-4 mb-8">
        <div className="w-full sm:flex-1">
          <TextField
            label={`Search by ${searchType}`}
            fullWidth
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="contained" color="primary" onClick={handleOnSearch}>Search</Button>
        </div>
      </section>

      <UsersTable
        users={users}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isError={isError}
        page={page}
        limit={limit}
        onEditClick={handleEditClick}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EditUserDrawer
        isOpen={isEditDrawerOpen}
        user={editingUser}
        onClose={() => {
          setIsEditDrawerOpen(false);
          setEditingUser(null);
        }}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: UserUpdateDTO) => handleSaveEdit(form)}
      />

      {Toast}
    </main>
  );
}
