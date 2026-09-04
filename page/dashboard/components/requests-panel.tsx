"use client";

import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ContactMessage } from "@/constants/types";

export function RequestsPanel({
  isDeleting,
  isFetching,
  messages,
  onDelete,
  onMarkRead,
}: {
  isDeleting: boolean;
  isFetching: boolean;
  messages: ContactMessage[];
  onDelete: (messageId: number) => void;
  onMarkRead: (messageId: number) => void;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-secondary/25">
      <div className="border-b border-border/50 p-4">
        <h2 className="font-semibold">Contact Requests</h2>
      </div>
      <div className="divide-y divide-border/40">
        {messages.map((message) => (
          <div key={message.id} className="grid gap-3 p-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="font-medium">{message.subject}</p>
                <p className="text-sm text-muted-foreground">
                  {message.name} / {message.email}
                </p>
                {message.created_at ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onMarkRead(message.id)}
                >
                  Mark Read
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
            <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
              {message.message}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-background/55 px-3 py-1">
                {message.status}
              </span>
              {message.budget ? (
                <span className="rounded-full bg-background/55 px-3 py-1">
                  Budget: {message.budget}
                </span>
              ) : null}
              {message.phone ? (
                <span className="rounded-full bg-background/55 px-3 py-1">
                  Phone: {message.phone}
                </span>
              ) : null}
            </div>
          </div>
        ))}
        {isFetching ? (
          <p className="p-4 text-sm text-muted-foreground">
            Loading requests...
          </p>
        ) : null}
        {!isFetching && messages.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">
            No contact requests yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
