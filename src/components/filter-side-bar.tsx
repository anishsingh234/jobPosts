"use client";
import { Button, Card, RadioGroup, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchparams = useSearchParams();
  const q = searchparams.get("query") || "";
  const jt = searchparams.get("jt") || "Full Time";
  const ap = searchparams.get("ap") || "LinkedIn";

  const [type, settype] = useState(jt);
  const [apply, setapply] = useState(ap);

  function handlesubmit() {
    const url = `/search?q=${q}&jt=${type}&ap=${apply}`;
    router.push(url);
  }

  return (
    <div className="min-w-64 space-y-4">
      <Card className="p-4">
        <Text className="font-semibold">Job Type:</Text>
        <RadioGroup.Root
          name="jobType"
          value={type}
          onValueChange={(value) => settype(value)}
          className="space-y-2 mt-2"
        >
          <RadioGroup.Item value="Full Time">Full Time</RadioGroup.Item>
          <RadioGroup.Item value="Part Time">Part Time</RadioGroup.Item>
          <RadioGroup.Item value="Contract">Contract</RadioGroup.Item>
        </RadioGroup.Root>
      </Card>

      <Card className="p-4">
        <Text className="font-semibold">Apply Through:</Text>
        <RadioGroup.Root
          name="applyThrough"
          value={apply}
          onValueChange={(value) => setapply(value)}
          className="space-y-2 mt-2"
        >
          <RadioGroup.Item value="Google">Google</RadioGroup.Item>
          <RadioGroup.Item value="LinkedIn">LinkedIn</RadioGroup.Item>
          <RadioGroup.Item value="Github">Github</RadioGroup.Item>
        </RadioGroup.Root> 
      </Card>

      <Button onClick={handlesubmit} className="w-full mt-2">
        Apply Filters
      </Button>
    </div>
  );
}
