import { UserContext } from "@/app/(group)/layout";
import { Button, DropdownMenu, Grid, Text } from "@radix-ui/themes";
import React, { useContext } from "react";
import { LuCircleUserRound } from "react-icons/lu";
import Link from "next/link";

export default function UserDropDownButton() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Grid columns="2" gap="3" display="inline-grid">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button color="teal" variant="soft" highContrast>
              <LuCircleUserRound size={20} />
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content color="teal" variant="soft" sideOffset={5}>
            <DropdownMenu.Item asChild>
              <Link href="/AddJob">➕ Add Job</Link>
            </DropdownMenu.Item>

            {!user?.company && (
              <DropdownMenu.Item asChild>
                <Link href="/addcompany">🏢 Add Company</Link>
              </DropdownMenu.Item>
            )}

            {user?.company && (
              <DropdownMenu.Item asChild>
                <Link href={`/company/${user.company.id}`}>
                  🏢 View Company
                </Link>
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Separator />

            <DropdownMenu.Item>🗃️ Archive</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Grid>
    </div>
  );
}
