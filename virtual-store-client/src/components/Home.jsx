import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
import CustomModal from "./CustomModal";
import { get, post, put, deleteSomething } from "../services/apiService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

function EditToolbar(props) {
  const { setRows, setRowModesModel, tempId, setTempId } = props;

  const handleClick = () => {
    const id = `temp-${tempId}`;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", email: "", role: "Customer", isNew: true },
    ]);
    setTempId(tempId + 1);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const Home = () => {
  let initialRows = [
    {
      id: 1,
      name: "Maria",
      email: "juarez@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Juan",
      email: "sequera@gmail.com",
      role: "Customer",
    },
  ];

  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [tempId, setTempId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    get(`/user`)
      .then((response) => {
        setRows(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setUserToDelete(null);
    setOpenModal(false);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (data) => () => {
    if (data.isNew) {
      toast.promise(
        post("/user", { ...data }).then(() => {
          recallUsers();
        }),
        {
          pending: "Loading",
          success: "Success",
          error: "Error",
        }
      );
    } else {
      toast.promise(
        put(`/user/${data.id}`, { ...data }).then(() => {
          recallUsers();
        }),
        {
          pending: "Loading",
          success: "Success",
          error: "Error",
        }
      );
    }
  };

  const recallUsers = () => {
    setIsLoading(true);
    get(`/user`)
      .then((response) => {
        setRows(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching users data:", error);
      });
  };

  const handleDeleteClick = (user) => () => {
    setUserToDelete(user);
    handleOpen();
  };

  const confirmDelete = () => {
    if (userToDelete.isNew) {
      setRows(rows.filter((row) => row.id !== userToDelete.id));
    } else {
      toast.promise(
        deleteSomething(`/user`, userToDelete.id).then(() => {
          recallUsers();
        }),
        {
          pending: "Loading",
          success: "Success",
          error: "Error",
        }
      );
    }

    handleClose();
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 80,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    { field: "name", headerName: "Name", width: 150, editable: true },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Admin", "Seller", "Customer"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (data) => {
        const { id, row } = data;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(row)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <div className='table-view'>
      <p className='loginTitle'>Virtual Market - User Management</p>
      <div
        style={{
          width: "80%",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <DataGrid
          autoHeight
          loading={isLoading}
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
            loadingOverlay: LinearProgress,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, tempId, setTempId },
          }}
        />
        <CustomModal
          title={"Delete User"}
          text={"Do you want to delete the user?"}
          isOpen={openModal}
          onClickConfirmation={confirmDelete}
          handleClose={handleClose}
        />
      </div>
      <div
        style={{
          padding: 100,
        }}>
        <Button variant='contained' onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;
