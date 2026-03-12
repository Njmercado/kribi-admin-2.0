'use client'
import { useState } from 'react';
import { Drawer, TextField, Box, Chip, Select, MenuItem, Button } from "@mui/material"
import { IUser } from "@/models"
import { ENTITLEMENTS, ROLES } from "@/contants";

export interface AddUserDrawerProps {
  open: boolean;
  onClose: (event: any, reason: 'backdropClick' | 'escapeKeyDown') => void;
  direction: 'left' | 'right' | 'top' | 'bottom'
  onSave: (user: IUser) => void;
}

const emptyUser: IUser = {
  name: '',
  last_name: '',
  email: '',
  username: '',
  role: 'VIEWER',
  is_active: true,
  entitlements: [],
  full_name: '',
  is_super_user: false,
}

export function AddUserDrawer({
  open,
  onClose,
  direction = 'right',
  onSave,
}: AddUserDrawerProps) {

  const [user, setUser] = useState<IUser>(emptyUser);
  const [chosenEntitlements, setChosenEntitlements] = useState<Array<ENTITLEMENTS>>([]);

  const handleEntitlementSelection = (entitlement: ENTITLEMENTS) => {
    if (chosenEntitlements?.includes(entitlement)) {
      setChosenEntitlements(chosenEntitlements.filter((e) => e !== entitlement));
    } else {
      setChosenEntitlements([...chosenEntitlements, entitlement]);
    }
  }

  const areFieldsValid = () => {
    return user.name && user.last_name && user.email && user.username && user.role;
  }

  return (
    <Drawer
      anchor={direction}
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 800, p: 4 }}>
        <section className="flex justify-start">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onClose(undefined, 'escapeKeyDown')}
          >
            Close
          </Button>
        </section>
        <section className="flex flex-col gap-1 mt-4">
          <h2 className="text-xl font-bold tracking-wide">Add User</h2>
          <p className="text-sm text-text-secondary">Add a new user to the system</p>
        </section>
        <section className="flex flex-col gap-4 mt-4">
          <TextField
            label="Name"
            fullWidth
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            required
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="Username"
            fullWidth
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            label="Location"
            fullWidth
            onChange={(e) => setUser({ ...user, location: e.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <div>
            <Select
              id="role"
              label="Role"
              fullWidth
              value={user.role}
              required
              onChange={(e) => setUser({ ...user, role: e.target.value as ROLES })}
            >
              {Object.values(ROLES).map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="entitlements" className="text-lg font-bold">Entitlements</label>
            <div id="entitlements" className="flex flex-wrap gap-2 mt-4">
              {Object.values(ENTITLEMENTS).map((entitlement) => (
                <Chip
                  key={entitlement}
                  label={entitlement}
                  onClick={() => handleEntitlementSelection(entitlement as ENTITLEMENTS)}
                  color={chosenEntitlements?.includes(entitlement as ENTITLEMENTS) ? 'primary' : 'default'}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="flex justify-end mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(user)}
            disabled={!areFieldsValid()}
          >
            Save
          </Button>
        </section>
      </Box>
    </Drawer>
  )
}