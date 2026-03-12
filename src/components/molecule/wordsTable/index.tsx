import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@/components/atom/IconButton";
import { WordDTO, WordSearchDTO } from "@/models";
import { useLazyCheckAuthQuery } from '@/libs/store/api/authApiSlice';
import { Action, ENTITLEMENTS } from '@/contants';

export interface WordsTableProps {
  wordsResponse?: WordSearchDTO | null;
  isSearchError: boolean;
  page: number;
  limit: number;
  onEditClick: (word: WordDTO) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: (page: number) => void;
}

export function WordsTable({
  wordsResponse,
  isSearchError,
  page,
  limit,
  onEditClick,
  onPageChange,
  onRowsPerPageChange,
  setPage,
}: WordsTableProps) {

  const [canEdit, setCanEdit] = useState(false);
  const [checkAuth] = useLazyCheckAuthQuery();

  useEffect(() => {
    checkAuth().then((res) => {
      const entitlements = res.data?.entitlements as ENTITLEMENTS[];
      setCanEdit(entitlements.includes(Action.EDIT_WORD as ENTITLEMENTS));
    });
  }, []);

  return (
    <TableContainer component={Paper} elevation={2} className="mt-6 border border-gray-100/50">
      <Table sx={{ minWidth: 650 }} aria-label="words table">
        <TableHead className="bg-gray-50/80">
          <TableRow>
            <TableCell className="font-semibold text-gray-700">Name</TableCell>
            <TableCell className="font-semibold text-gray-700">Type</TableCell>
            <TableCell className="font-semibold text-gray-700">Translations</TableCell>
            <TableCell className="font-semibold text-gray-700">Definition</TableCell>
            <TableCell className="font-semibold text-gray-700" align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isSearchError && wordsResponse && wordsResponse.words
            .map((word: WordDTO) => (
              <TableRow
                key={word.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell component="th" scope="row" className="font-medium">
                  {word.word}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wider">
                    {word.type}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {word.translations.join(', ') || <i>No translations</i>}
                </TableCell>
                <TableCell className="max-w-xs truncate text-gray-600">
                  {word.definitions.join(', ') || <i>No definitions</i>}
                </TableCell>
                <TableCell align="right">
                  {canEdit && (
                    <IconButton
                      color="primary"
                      onClick={() => onEditClick(word)}
                      title="Edit word"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          {(!wordsResponse || wordsResponse.words.length === 0) && !isSearchError && (
            <TableRow>
              <TableCell colSpan={5} align="center" className="py-8 text-gray-500">
                No words found. Try adjusting your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {wordsResponse && wordsResponse.words.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={-1} // its -1 because the paging and limit is handled by the backend
          rowsPerPage={limit}
          page={page - 1}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          slotProps={{
            actions: {
              nextButton: {
                disabled: !wordsResponse.has_next_page,
                onClick: () => {
                  setPage(page + 1);
                }
              },
              previousButton: {
                disabled: page <= 1,
                onClick: () => {
                  setPage(page - 1);
                }
              },
            }
          }}
        />
      )}
    </TableContainer>
  );
}
