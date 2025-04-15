"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BillingHistoryTable() {
  const { sessionkey } = useUserContext(); // Assuming you're getting email and password from context
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<any[]>([]); // All requests fetched from the server

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${sessionkey}`, // Basic auth
          },
        });
        setTransactions(response.data.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [sessionkey]);

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString); // Parse the string into a Date object
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC", // Force the timezone to UTC
      // timeZoneName: 'short', // To show "UTC" in the output
    });
  };

  return (
    <Table className="mt-5 gen-text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>Card End</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time Stamp</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.card_end}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>£{item.amount.toLocaleString()}</TableCell>
            <TableCell>{formatDate(item.time_stamp)}</TableCell>
            <TableCell className="capitalize">{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
