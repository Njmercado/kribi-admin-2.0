'use client'

import { useState, useEffect } from "react"
import { AddWordDrawer, EditWordDrawer } from "@/components/molecule";
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
import { TextField, Button } from "@/components/atom";
import { WordDTO, IWord, WordSearchDTO } from "@/models";
import { useRequest, search, update, create, erase } from "@/api";
import { DrawerDirection } from "@/components/atom/drawer";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordDTO | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { request: updateWordRequest } = useRequest<WordDTO>(update);
  const { request: createWordRequest } = useRequest<WordDTO>(create);
  const { request: eraseWordRequest } = useRequest(erase);
  const { response: getWordsResponse, request: searchWordRequest, isError: isSearchError } = useRequest<WordSearchDTO>(search);

  function handleEditClick(word: WordDTO) {
    setEditingWord(word);
    setIsEditDrawerOpen(true);
  }

  function handleSaveEdit(updatedWord: WordDTO) {
    updateWordRequest(updatedWord);
    setIsEditDrawerOpen(false);
    setEditingWord(null);
  }

  function handleDeleteEdit(wordId: string) {
    eraseWordRequest(wordId);
    setIsEditDrawerOpen(false);
    setEditingWord(null);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function handleOnSearch() {
    searchWordRequest(searchInput);
  }

  function handleAddWord() {
    setIsDrawerOpen(true);
  }

  function handleOnSubmit(form: IWord) {
    createWordRequest(form);
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    searchWordRequest(searchInput, limit, page);
  }, [page, limit]);

  return (
    <main className="max-w-7xl mx-auto">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-1/2">
          <TextField
            label="Search word"
            fullWidth
            onChange={event => setSearchInput(event.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" color="primary" onClick={handleOnSearch}>Search</Button>
          <Button variant="contained" color="secondary" onClick={handleAddWord}>Add Word</Button>
        </div>
      </section>

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
            {!isSearchError && getWordsResponse && getWordsResponse.words
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
                    <IconButton
                      color="primary"
                      // TODO: Analyze if this call should also call the word endpoint instead of passing local word information
                      onClick={() => handleEditClick(word)}
                      title="Edit word"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {(!getWordsResponse || getWordsResponse.words.length === 0) && !isSearchError && (
              <TableRow>
                <TableCell colSpan={5} align="center" className="py-8 text-gray-500">
                  No words found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {getWordsResponse && getWordsResponse.words.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={-1} // its -1 because the paging and limit is handled by the backend
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            slotProps={{
              actions: {
                nextButton: {
                  disabled: !getWordsResponse.has_next_page,
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

      <AddWordDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: IWord) => handleOnSubmit(form)}
      />

      <EditWordDrawer
        isOpen={isEditDrawerOpen}
        word={editingWord}
        onClose={() => { setIsEditDrawerOpen(false); setEditingWord(null); }}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSave={(form: WordDTO) => handleSaveEdit(form)}
        onDelete={(id: string) => handleDeleteEdit(id)}
      />
    </main>
  )
}
