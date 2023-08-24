import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import SubjectTable from "./SubjectTable";

export default function SubjectData(props) {

    const {subject, ShowSubject} = props
    const [open, setopen] = useState(false)

    


    React.useEffect(() => {
        ShowSubject()
        // eslint-disable-next-line
    }, [])

    const columns = [
        { field: '_id', headerName: 'ID', width: 210 },
        {
            field: 'subject',
            headerName: 'STUDENT',
            width: 100,
            editable: true,
        },
    ];


    return <>
        <div className="row w-100  mb-3">
            <div className="col">
                <Button variant="contained" onClick={() => setopen(true)} >Add Subject</Button>
            </div>
        </div>
        <Box sx={{ height: 400, width: '100%' }}>
            <SubjectTable open={open} setopen={setopen} />
            <DataGrid
                rows={subject ? subject : []}
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
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    </>
}