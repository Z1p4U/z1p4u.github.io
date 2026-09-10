"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import type { ContactMessage } from "@/constants/types";

import {
  getPaginationSummary,
  PaginationControls,
  type PaginationMeta,
} from "./pagination-controls";

function formatRequestDate(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute} UTC`;
}

function RequestCard({
  isDeleting,
  message,
  onDelete,
  onMarkRead,
}: {
  isDeleting: boolean;
  message: ContactMessage;
  onDelete: (messageId: number) => void;
  onMarkRead: (messageId: number) => void;
}) {
  const sentAt = formatRequestDate(message.created_at);

  return (
    <div className="grid gap-3 p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="font-medium">{message.subject}</p>
          <p className="text-sm text-muted-foreground">
            {message.name} / {message.email}
          </p>
          {sentAt ? (
            <p className="mt-1 text-xs text-muted-foreground">{sentAt}</p>
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
  );
}

export function RequestsPanel({
  isDeleting,
  isFetching,
  messages,
  paginationMeta,
  onDelete,
  onPageChange,
  onMarkRead,
}: {
  isDeleting: boolean;
  isFetching: boolean;
  messages: ContactMessage[];
  paginationMeta?: PaginationMeta;
  onDelete: (messageId: number) => void;
  onPageChange: (page: number) => void;
  onMarkRead: (messageId: number) => void;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-secondary/25">
      <div className="border-b border-border/50 p-4">
        <h2 className="font-semibold">Contact Requests</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isFetching
            ? "Loading requests..."
            : getPaginationSummary(paginationMeta)}
        </p>
      </div>
      <div className="divide-y divide-border/40">
        {messages.map((message) => (
          <RequestCard
            key={message.id}
            isDeleting={isDeleting}
            message={message}
            onDelete={onDelete}
            onMarkRead={onMarkRead}
          />
        ))}
        {isFetching && messages.length === 0 ? (
          <div className="p-4">
            <LoadingState compact label="Loading requests..." />
          </div>
        ) : null}
        {!isFetching && messages.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">
            No contact requests yet.
          </p>
        ) : null}
      </div>
      <PaginationControls
        isFetching={isFetching}
        meta={paginationMeta}
        onPageChange={onPageChange}
      />
    </div>
  );
}
