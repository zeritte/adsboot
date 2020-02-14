import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Link,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers/Wrappers";

const states = {
  deleted: "deleted",
  pause: "pause",
  active: "active",
};

export default function ReportComponent({ data }) {
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
        {data.map(({ adId, reportId, adUrl, inStock, page200 }) => (
          <TableRow key={adId}>
            <TableCell className="pl-3 fw-normal">{adId}</TableCell>
            <TableCell>{reportId}</TableCell>
            <TableCell>
              <Link target="_blank" rel="noopener" href={adUrl}>
                {adUrl}
              </Link>
            </TableCell>
            <TableCell>{inStock ? "YES" : "NO"}</TableCell>
            <TableCell>{page200 ? "YES" : "NO"}</TableCell>
            {/* <TableCell>
                <Button
                  color={states[status.toLowerCase()]}
                  size="small"
                  className="px-2"
                  variant="contained"
                >
                  {status}
                </Button>
              </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
