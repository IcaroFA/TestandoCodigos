import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function DenseTable(props) {

  return (
    <TableContainer sx={{gridColumn:'span 4'}}>
      <Table  aria-label="a dense table">
        <TableHead sx={{ fontWeight: 'bold' }}>
          <TableRow sx={{
            border: 1,
            borderColor: '#D3D3D3'

          }}
          >
            <TableCell sx={{
              borderRight: 1,
              borderColor: '#D3D3D3'
            }}
              align="center"></TableCell>
            <TableCell sx={{
              borderRight: 1,
              borderColor: '#D3D3D3',
              fontWeight: 'bold',
              color: '#808080'

            }}
              align="left">First Name</TableCell>
            <TableCell sx={{
              borderRight: 1,
              borderColor: '#D3D3D3',
              fontWeight: 'bold',
              color: '#808080'

            }}
              align="leftu">Last Name</TableCell>
            <TableCell sx={{
              borderRight: 1,
              borderColor: '#D3D3D3',
              fontWeight: 'bold',
              color: '#808080'
            }}
              align="center">Participation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                border: 1,
                borderColor: '#D3D3D3',
                color: '#808080'

              }}
            >
              <TableCell sx={{
                borderRight: 1,
                borderColor: '#D3D3D3',
                width: '5px',
                color: '#808080'

              }}
                align="center">{index + 1}</TableCell>
              <TableCell sx={{
                borderRight: 1,
                borderColor: '#D3D3D3',
                color: '#808080'

              }}
                align="left">{user.firstName}</TableCell>
              <TableCell sx={{
                borderRight: 1,
                borderColor: '#D3D3D3',
                color: '#808080'

              }}
                align="left">{user.lastName}</TableCell>
              <TableCell sx={{
                borderRight: 1,
                borderColor: '#D3D3D3',
                width: 2,
                height: 2,
                color: '#808080'

              }}
                align="center">{`${user.participation}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}