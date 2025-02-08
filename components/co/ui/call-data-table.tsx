import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../lib/table";
  import { Card, CardContent, CardHeader, CardTitle } from "../lib/card";
  import {
    formatDuration,
    formatDate,
    formatTime,
  } from "../../../app/api/utils/formatters";
  import { Badge } from "../lib/badge";
  import { Star } from "lucide-react";
  import { Call } from "../../types/call";
  
  interface CallDataTableProps {
    data: Call[];
  }
  
  function getBadgeVariant(callType: string) {
    switch (callType) {
      case "incoming":
        return "primary";
      case "outgoing":
        return "secondary";
      default:
        return "default";
    }
  }
  
  interface TableHeadProps {
    children: React.ReactNode;
    className?: string;
  }

  const TableHead: React.FC<TableHeadProps> = ({ children, className }) => (
    <th className={className}>{children}</th>
  );
  
  interface TableCellProps {
    children: React.ReactNode;
    className?: string;
  }

  const TableCell: React.FC<TableCellProps> = ({ children, className }) => (
    <td className={className}>{children}</td>
  );
  
  export function CallDataTable({ data }: CallDataTableProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Recent Call Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Phone Number</TableHead>
                  <TableHead className="font-semibold">Duration</TableHead>
                  <TableHead className="font-semibold">Call Type</TableHead>
                  <TableHead className="font-semibold">Appointment</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                  <TableHead className="font-semibold">Call Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">
                      {row.from_number}
                    </TableCell>
                    <TableCell>{formatDuration(row.duration / 60)}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(row.call_type)}>
                        {row.call_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {row.appointment_booked ? (
                        <Badge variant="default">Booked</Badge>
                      ) : (
                        <Badge variant="secondary">Not Booked</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < row.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(new Date(row.start_time))} {" "}
                      {formatTime(new Date(row.start_time))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }