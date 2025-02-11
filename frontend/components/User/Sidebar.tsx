"use client";
import React, { useEffect, useState } from "react";
import SideItem from "./SideItem";
import { TicketType } from "@/types/types";
import { getMethod } from "@/lib/helper/getMethod";
import { useSearchParams } from "next/navigation";

export default function Sidebar() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [option, setOption] = useState<string | null>("");
  const update = useSearchParams().get("update");
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getMethod(`/ticket?status=${option}`, ["ticket"]);
      if (!data.message) {
        setTickets(data);
      }
    };
    fetchTickets();
  }, [update,option]);

  const shows = tickets?.map((item) => (
    <SideItem key={item.ticket_id} ticket={item} />
  ));
  return (
    <div className="md:w-[30%] w-full bg-white rounded-md min-h-80 max-h-screen overflow-y-scroll p-4">
      <div className="flex justify-between">
        <h1 className="text-slate-600">All Complains</h1>
        <div>
          <select
            id="filter"
            className=" px-3 py-2 border text-sm focus:outline-none rounded-md "
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="">All</option>
            <option value="OPEN">Open</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="items mt-5 flex flex-col gap-2">{shows}</div>
    </div>
  );
}
