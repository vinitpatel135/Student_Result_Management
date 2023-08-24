import apiHelper from "../../API/ApiHelper";
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import StudentTable from "./StudentTable";
import StudentMarks from "../Marks/AddMarks";
import { useNavigate } from "react-router-dom";


export default function StudentData(props) {
    const { subject } = props
    const [student, setstudent] = useState([])
    const [open, setopen] = useState(false)
    const [openmarks, setopenmarks] = useState(false)
    const [selectSTU, setselectSTU] = useState([])
    const navigate = useNavigate()

    const ShowResult = async () => {
        try {
            const result = await apiHelper.GetStudent()
            if (result && result.status === 200) {
                setstudent(result.data.student)
            }

        } catch (error) {

        }
    }


    React.useEffect(() => {
        ShowResult()
    }, [])

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'name',
            headerName: 'STUDENT',
            width: 100,
            editable: true,
        },
        {
            field: 'std',
            headerName: 'STD',
            width: 100,
            editable: true,
        },
        {
            field: 'aciotn',
            headerName: 'ACTION',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (Cell) => {
                return <>
                    <Button variant="outlined" 
                    onClick={() => navigate("/result/" + Cell.row._id)}
                    >Result</Button>
                </>
            }
        },
        {

            field: 'MARKS',
            headerName: 'MARKS',
            type: 'number',
            width: 150,
            editable: true,
            renderCell: (Cell) => {
                return <>
                    <Button variant="outlined" color="error"
                    onClick={() => {
                        setopenmarks(true)
                        setselectSTU(Cell.row)
                    }}
                    >Add Marks</Button>
                </>
            }
        },

    ];

    console.log(subject);

    return <>
        <div className="row w-100  mb-3 justify-content-between   align-items-center ">
            <div className="col">
                <Button variant="contained" onClick={() => setopen(true)} >Add Student</Button>
            </div>
            {/* <div className="col-3 text-end">
                <Button variant="contained" onClick={() => setopen_sub(true)}>Add Subject</Button>
            </div> */}
            {/* <div className="col-4">
                <Button variant="contained" sx={{ margin: 1 }}>Add Marks</Button>
            </div> */}
        </div>
        <Box sx={{ height: 400, width: '100%' }}>
            <StudentTable open={open} setopen={setopen} ShowResult={ShowResult} />
            <StudentMarks openmarks={openmarks} setopenmarks={setopenmarks} subject={subject} selectSTU={selectSTU} ShowResult={ShowResult} />
            <DataGrid
                rows={student ? student : []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                getRowId={(e) => e._id}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    </>
}