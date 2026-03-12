'use client';

import { useState, useEffect } from "react";
import { Drawer, DrawerSize } from '@/components/atom/drawer';
import { Button, TextField } from '@/components/atom';
import { UserDTO, UserUpdateDTO } from "@/models";
import { DrawerDirection } from '@/components/atom/drawer';
import { ROLES } from '@/contants/roles.constant';
import { ENTITLEMENTS } from '@/contants/entitlements.constant';
import { useCheckAuthQuery } from '@/libs/store/api/authApiSlice';

export interface EditUserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (user: UserUpdateDTO) => void;
  user: UserDTO;
  direction?: DrawerDirection;
  onDelete?: (userId: string | number) => void;
  onRestore?: (userId: string | number) => void;
}

export function EditUserDrawer({
  isOpen,
  onClose,
  onSubmit,
  user,
  direction = DrawerDirection.RIGHT_TO_LEFT,
  onDelete,
  onRestore,
}: EditUserDrawerProps) {

  const [form, setForm] = useState<UserUpdateDTO | null>(null);
  const { data: me } = useCheckAuthQuery();

  useEffect(() => {
    if (user && isOpen) {
      setForm({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        entitlements: [...user.entitlements],
        is_active: user.is_active,
        full_name: user.full_name,
      });
    } else {
      setForm(null);
    }
  }, [user, isOpen]);

  const hasChanged = () => {
    if (!form || !user) return false;
    return (
      form.full_name !== user.full_name ||
      form.email !== user.email ||
      form.username !== user.username ||
      form.role !== user.role ||
      form.is_active !== user.is_active ||
      JSON.stringify(form.entitlements) !== JSON.stringify(user.entitlements)
    );
  };

  const disableSubmit = !form || !form.full_name?.trim() || !form.email?.trim() || !hasChanged();

  function handleOnSubmit() {
    if (form) {
      onSubmit?.(form);
    }
  }

  function handleEntitlementToggle(entitlement: string) {
    if (!form) return;
    const current = form.entitlements || [];
    const updated = current.includes(entitlement)
      ? current.filter(e => e !== entitlement)
      : [...current, entitlement];
    setForm({ ...form, entitlements: updated });
  }

  if (!form) return null;

  const roleOptions = Object.values(ROLES);
  const entitlementOptions = Object.values(ENTITLEMENTS).filter(e => e !== 'NONE');

  const handleActiveButton = () => {
    if (user.is_active) {
      onDelete?.(user.id)
    } else {
      onRestore?.(user.id)
    }
  }

  return (
    <Drawer
      direction={direction}
      isOpen={isOpen}
      onClose={onClose}
      size={DrawerSize.MEDIUM}
    >
      <article className="drawer-content flex flex-col h-full bg-surface">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Edit User</h2>
          <p className="text-sm text-text-secondary mt-1">Update user details and permissions</p>
        </section>
        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          <TextField
            label="Full Name"
            fullWidth
            value={form.full_name || ''}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />

          <TextField
            label="Email"
            fullWidth
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            label="Username"
            fullWidth
            value={form.username || ''}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-text-secondary">Role</label>
            <select
              value={form.role || ''}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-text-secondary">Entitlements</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {entitlementOptions.map((entitlement) => (
                <label
                  key={entitlement}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={form.entitlements?.includes(entitlement) ?? false}
                    onChange={() => handleEntitlementToggle(entitlement)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-xs text-text-primary">{entitlement}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section>
          <Button id="active-button" variant="contained" color={user.is_active ? 'error' : 'primary'} onClick={() => handleActiveButton()}>
            {user.is_active ? 'Delete' : 'Restore'}
          </Button>
        </section>

        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
          <Button
            variant="text"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
            disabled={disableSubmit}
          >
            Save
          </Button>
        </section>
      </article>
    </Drawer >
  );
}
