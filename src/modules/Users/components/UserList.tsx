import { Avatar, Paper, Chip } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useSelectUsersStore } from 'modules/Users';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const configsShowOnlyText = {
  sortable: false,
  filterable: false,
  hideable: false,
  disableColumnMenu: true
};
interface UserListProps {
  onEditUser: (userId: any) => void;
  onRemoveUser: (userId: any) => void;
}
export const UserList: React.FC<UserListProps> = ({
  onEditUser,
  onRemoveUser
}) => {
  const [pageSize, setPageSize] = React.useState(5);
  const { entities } = useSelectUsersStore();

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'avatar',
      headerName: 'Avatar',
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      ...configsShowOnlyText,
      renderCell: ({ row }) => (
        <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
      )
    },
    { field: 'first_name', flex: 1, headerName: 'First Name', minWidth: 200 },
    { field: 'last_name', flex: 1, headerName: 'Last Name', minWidth: 200 },
    { field: 'email', flex: 1, headerName: 'Email', minWidth: 200 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      renderCell: ({ row }) => (
        <Chip
          label={row.role}
          size="small"
          color={row.role === 'admin' ? 'success' : undefined}
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      renderCell: ({ row }) =>
        row.role !== 'admin' && (
          <>
            <GridActionsCellItem
              key="edit"
              icon={<EditIcon />}
              label="Edit"
              color="info"
              onClick={() => onEditUser(row._id)}
            />
            <GridActionsCellItem
              key="delete"
              icon={<DeleteIcon color="error" />}
              label="Delete"
              onClick={() => onRemoveUser(row._id)}
            />
          </>
        )
    }
  ];
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 400, width: '100%' }}>
        {entities && (
          <DataGrid
            // rowHeight={40}
            rows={entities}
            columns={columns as any}
            getRowId={row => row._id}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            initialState={{ pinnedColumns: { right: ['actions'] } }}
          />
        )}
      </div>
    </Paper>
  );
};
