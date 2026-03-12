export enum UserActionsMessages {
  USER_UPDATED_SUCCESSFULLY = 'User updated successfully',
  USER_DELETED_SUCCESSFULLY = 'User deleted successfully',
  USER_RESTORED_SUCCESSFULLY = 'User restored successfully',
  USER_NOT_FOUND = 'User not found',
  USER_COULD_NOT_BE_UPDATED = 'User could not be updated',
  USER_COULD_NOT_BE_DELETED = 'User could not be deleted',
  USER_COULD_NOT_BE_RESTORED = 'User could not be restored',
}

export enum UserSearchType {
  ID = 'ID',
  EMAIL = 'Email',
  USERNAME = 'Username',
  NAME = 'Name',
}
