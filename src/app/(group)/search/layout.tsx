
"use client";

import FilterSidebar from "@/components/filter-side-bar";
import { CheckboxGroup, RadioGroup } from "@radix-ui/themes";

export default function Layout({ children }) {
  return (
    <div className="flex items-start">
        <div className="min-w-64">
        <FilterSidebar/>

        </div>
        {children}
    </div>
  );
}
