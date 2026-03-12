'use client';
import { ActionType, Action } from "@/contants";
import { useCheckAuthQuery } from "@/libs/store/api/authApiSlice";

export function useHaveAccess() {
  const { data: me } = useCheckAuthQuery();

  const haveEntitlements = (action: ActionType) => me?.entitlements.includes(action);
  const haveRole = (action: ActionType) => me?.role === action;
  const isSuperAdmin = () => me?.role === Action.SUPER_ADMIN;

  const haveAccess = (action: ActionType) => haveEntitlements(action) || haveRole(action) || isSuperAdmin();

  return {
    me,
    haveEntitlements,
    haveRole,
    isSuperAdmin,
    haveAccess
  }
}