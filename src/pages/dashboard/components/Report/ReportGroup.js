import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Link,
  Typography,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers/Wrappers";

export default function ReportComponent({
  data,
  onClick,
  selectedId,
  selectedBGColor,
}) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ reportGroupId, createdAt, totalAdCount }) => (
          <TableRow
            key={reportGroupId}
            style={{
              backgroundColor: reportGroupId === selectedId && selectedBGColor,
            }}
            onClick={() =>
              reportGroupId !== selectedId && onClick(reportGroupId)
            }
          >
            <TableCell className="pl-3 fw-normal">{reportGroupId}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{totalAdCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
