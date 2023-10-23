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
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
import CustomModal from "../components/CustomModal";
import { get, signUp, put, deleteSomething } from "../services/apiService";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch } from "react-redux";

function EditToolbar(props) {
  const { setRows, setRowModesModel, tempId, setTempId } = props;

  const handleClick = () => {
    const id = `temp-${tempId}`;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", email: "", role: "customer", isNew: true },
    ]);
    setTempId(tempId + 1);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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

const DataManagement = () => {
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [tempId, setTempId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const apiRef = useGridApiRef();

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
    const rowData = apiRef.current.getRowWithUpdatedValues(data.id);

    if (data.isNew) {
      const userData = {
        email: rowData.email,
        name: rowData.name,
        role: rowData.role,
        password: rowData.pass,
      };
      toast.promise(
        signUp(userData, true).then(() => {
          recallUsers();
        }),
        {
          pending: "Loading",
          success: "Success",
          error: "Error",
        }
      );
    } else {
      const userData = {
        email: rowData.email,
        name: rowData.name,
        role: rowData.role,
      };

      toast.promise(
        put(`/user/${data.id}`, { ...userData }).then(() => {
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
        setRowModesModel({});
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
    //TODO call api to delete
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
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "pass",
      headerName: "Temporal Password",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "seller", "customer"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
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
      <p className='pageTitles'>Virtual Market - User Management</p>
      <div
        style={{
          width: "80%",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <DataGrid
          autoHeight
          apiRef={apiRef}
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
    </div>
  );
};

export default DataManagement;
