'use client';
import { useAppSelector } from "@/libs/store";
import { ActionType } from "@/contants";

export function useHaveAccess(action: ActionType) {
  const me = useAppSelector((state) => state.me);

  const haveEntitlements = () => me?.entitlements.includes(action);
  const haveRole = () => me?.role === action;

  const haveAccess = () => haveEntitlements() || haveRole();

  return {
    me,
    haveEntitlements,
    haveRole,
    haveAccess
  }
}