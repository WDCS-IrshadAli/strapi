"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function AdminCategoriesTable({ data }: { data: string[] }) {
  
  return (
    <>
        <Table>
            <TableCaption>A list of your recent categories.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Categories</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((curElem, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{index}</TableCell>
                    <TableCell>{curElem}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    </>
  )
}
