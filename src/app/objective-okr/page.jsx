import React from "react";
import OkrTable from "@/components/OkrTable";

export const dynamic = 'force-dynamic'

export default function Objective() {
  return (
    <div className="px-2 mt-5">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        OKRs
      </h2>
      <OkrTable />
    </div>
  );
}
