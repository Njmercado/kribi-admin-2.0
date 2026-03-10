import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ArticleDTO, ArticleSearchDTO } from '@/models';
import { IconButton } from '@/components/atom/IconButton';

export interface ArticlesTableProps {
  articlesResponse: ArticleSearchDTO | undefined | null;
  isSearchError: boolean;
  page: number; // 1-indexed for the parent, but 0-indexed for MUI TablePagination internally
  limit: number;
  onEditClick: (article: ArticleDTO) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ArticlesTable({
  articlesResponse,
  isSearchError,
  page,
  limit,
  onEditClick,
  onPageChange,
  onRowsPerPageChange,
}: ArticlesTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} className="rounded-xl border border-gray-100">
      <Table sx={{ minWidth: 650 }} aria-label="articles table">
        <TableHead className="bg-gray-50/50">
          <TableRow>
            <TableCell className="font-semibold text-text-secondary w-1/4">Title</TableCell>
            <TableCell className="font-semibold text-text-secondary w-1/4">Coverage / Abstract</TableCell>
            <TableCell className="font-semibold text-text-secondary w-1/4">Tags</TableCell>
            <TableCell className="font-semibold text-text-secondary w-24">Status</TableCell>
            <TableCell align="center" className="font-semibold text-text-secondary w-24">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isSearchError && articlesResponse && articlesResponse.articles.length > 0 ? (
            articlesResponse.articles.map((article: ArticleDTO) => (
              <TableRow
                key={article.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-50/30 transition-colors"
              >
                <TableCell component="th" scope="row" className="font-medium text-text-primary">
                  {article.title}
                </TableCell>
                <TableCell className="text-text-secondary">
                  {article.content && article.content.length > 100
                    ? `${article.content.substring(0, 100)}...`
                    : article.content || 'No content...'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {article.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {article.tags && article.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full ${article.published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEditClick(article)}>
                    <EditIcon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" className="py-8 text-text-secondary">
                {isSearchError ? 'Error loading articles.' : 'No articles found.'}
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
        page={page - 1} // MUI uses 0-based index for pages, our logic is 1-based
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        className="border-t border-gray-100"
      />
    </TableContainer>
  );
}
