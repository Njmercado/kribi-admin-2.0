'use client';

import { Card, CardContent } from "@/components/atom";
import PeopleIcon from '@mui/icons-material/People';

export default function Users() {
  return (
    <main className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
      <article className="h-full flex flex-col">
        <Card elevation={2} className="h-full min-h-[50vh] flex flex-col items-center justify-center p-8 bg-surface">
          <CardContent className="text-center">
            <div className="mb-6 mx-auto bg-primary-light/20 p-4 rounded-full w-24 h-24 flex items-center justify-center text-primary">
              <PeopleIcon sx={{ fontSize: 48 }} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Users Management</h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              This module is under construction. It will allow you to manage administrator access, assigning roles and specific entitlements to new users.
            </p>
          </CardContent>
        </Card>
      </article>
    </main>
  )
}
