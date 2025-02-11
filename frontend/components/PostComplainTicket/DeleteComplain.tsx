'use client'
import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import LoadingButton from "../common/LoadingButton/LoadingButton";
import { TicketType } from "@/types/types";
import { otherMethod } from "@/lib/helper/postMethod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteComplain({ticket}:{ticket:TicketType}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const LabelRef = useRef<HTMLLabelElement>(null)
    const handleDelete = async () => {
        setLoading(true);

      const data = await otherMethod({
        
        url: `/ticket/${ticket.ticket_id}`,
        method: "DELETE",
      });
      if (data.status) {
        toast.success("Ticket deleted successfully");
        LabelRef?.current?.click()
        setLoading(false);
        router.push("?update=deleted")
      } else {
        toast.error("Failed to delete ticket");
        setLoading(false);
      }
    };
  return (
    <div>
      <label ref={LabelRef} htmlFor="delete-com" className="text-red-500 cursor-pointer flex text-sm place-items-center gap-2">
        <span>
          <RxCross1 />
        </span>
        <span>Delete</span>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="delete-com" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Are you sure want delete it!</h3>
          <p className="py-4">if you delete its wont be recover!</p>
          <div className="modal-action">
            <LoadingButton isLoading={loading} onClick={handleDelete} className="btn btn-error">
                Delete
            </LoadingButton>
            <label htmlFor="delete-com" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
