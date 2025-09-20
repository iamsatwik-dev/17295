import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getUrls } from "../utils/storage";

function StatsPage() {
  const urls = getUrls();

  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(urls).map(([code, data]) => (
            <TableRow key={code}>
              <TableCell>
                <a href={`/?id=${code}`} target="_blank" rel="noreferrer">
                  {window.location.origin}/?id={code}
                </a>
              </TableCell>
              <TableCell>{data.originalUrl}</TableCell>
              <TableCell>{new Date(data.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(data.expiresAt).toLocaleString()}</TableCell>
              <TableCell>{data.clicks.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default StatsPage;
