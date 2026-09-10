"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Grid3X3,
  MoreVertical,
  Pencil,
  Plus,
  Table2,
  Trash2,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import type { ProjectTaxonomy } from "@/constants/types";
import { cn } from "@/lib/utils";

import {
  getPaginationSummary,
  PaginationControls,
  type PaginationMeta,
} from "./pagination-controls";

type TaxonomyViewMode = "table" | "grid";

type TaxonomyListingPanelProps = {
  createHref: string;
  editHref: (id: number) => string;
  isDeleting: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  itemLabel: string;
  records: ProjectTaxonomy[];
  title: string;
  onDelete: (id?: number) => void;
  onPublishedChange: (record: ProjectTaxonomy, checked: boolean) => void;
};

const TAXONOMY_PER_PAGE = 12;

const taxonomyViews: {
  value: TaxonomyViewMode;
  label: string;
  icon: typeof Table2;
}[] = [
  { value: "table", label: "Table", icon: Table2 },
  { value: "grid", label: "Blocks", icon: Grid3X3 },
];

function makeMeta(records: ProjectTaxonomy[], currentPage: number) {
  const lastPage = Math.max(1, Math.ceil(records.length / TAXONOMY_PER_PAGE));
  const safePage = Math.min(currentPage, lastPage);

  return {
    current_page: safePage,
    last_page: lastPage,
    per_page: TAXONOMY_PER_PAGE,
    total: records.length,
  } satisfies PaginationMeta;
}

function TaxonomyStatus({ record }: { record: ProjectTaxonomy }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-1 text-xs",
        record.is_published
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
          : "border-muted-foreground/25 text-muted-foreground",
      )}
    >
      {record.is_published ? "Published" : "Draft"}
    </span>
  );
}

function PublishedSwitch({
  disabled,
  itemLabel,
  record,
  onPublishedChange,
}: {
  disabled: boolean;
  itemLabel: string;
  record: ProjectTaxonomy;
  onPublishedChange: (record: ProjectTaxonomy, checked: boolean) => void;
}) {
  return (
    <Switch
      aria-label={`Publish ${itemLabel} ${record.name}`}
      checked={record.is_published ?? true}
      disabled={disabled}
      onCheckedChange={(checked) => onPublishedChange(record, checked)}
    />
  );
}

function TaxonomyActionsMenu({
  editHref,
  isDeleting,
  itemLabel,
  record,
  onDelete,
}: {
  editHref: string;
  isDeleting: boolean;
  itemLabel: string;
  record: ProjectTaxonomy;
  onDelete: (id?: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Open actions for ${record.name}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={editHref}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onSelect={() => onDelete(record.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete {itemLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TaxonomyListingPanel({
  createHref,
  editHref,
  isDeleting,
  isFetching,
  isUpdating,
  itemLabel,
  records,
  title,
  onDelete,
  onPublishedChange,
}: TaxonomyListingPanelProps) {
  const [viewMode, setViewMode] = useState<TaxonomyViewMode>("table");
  const [currentPage, setCurrentPage] = useState(1);
  const meta = makeMeta(records, currentPage);
  const visibleRecords = records.slice(
    (meta.current_page - 1) * meta.per_page,
    meta.current_page * meta.per_page,
  );
  const hasRecords = records.length > 0;

  return (
    <section className="rounded-lg border border-border/50 bg-secondary/25">
      <div className="flex flex-col gap-3 border-b border-border/50 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isFetching ? `Loading ${title.toLowerCase()}...` : getPaginationSummary(meta)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-md border border-border/50 bg-background/45 p-1">
            {taxonomyViews.map((view) => (
              <button
                key={view.value}
                type="button"
                title={`${view.label} view`}
                onClick={() => setViewMode(view.value)}
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded px-3 text-xs font-medium transition-colors",
                  viewMode === view.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <view.icon className="h-4 w-4" />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
          <Link href={createHref} className={cn(buttonVariants({ size: "sm" }))}>
            <Plus className="h-4 w-4" />
            New
          </Link>
        </div>
      </div>

      {isFetching && !hasRecords ? (
        <div className="p-4">
          <LoadingState compact label={`Loading ${title.toLowerCase()}...`} />
        </div>
      ) : null}

      {!isFetching && !hasRecords ? (
        <div className="p-6 text-sm text-muted-foreground">
          No {title.toLowerCase()} found.
        </div>
      ) : null}

      {hasRecords && viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border/50 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Sort</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {visibleRecords.map((record) => (
                <tr
                  key={record.id ?? record.slug}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="max-w-[16rem] px-4 py-3">
                    <p className="truncate font-medium">{record.name}</p>
                    {record.description ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {record.description}
                      </p>
                    ) : null}
                  </td>
                  <td className="max-w-[14rem] px-4 py-3 text-muted-foreground">
                    <span className="block truncate">{record.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {record.sort_order ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <PublishedSwitch
                      disabled={isUpdating}
                      itemLabel={itemLabel}
                      record={record}
                      onPublishedChange={onPublishedChange}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <TaxonomyStatus record={record} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {record.id ? (
                      <TaxonomyActionsMenu
                        editHref={editHref(record.id)}
                        isDeleting={isDeleting}
                        itemLabel={itemLabel}
                        record={record}
                        onDelete={onDelete}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {hasRecords && viewMode === "grid" ? (
        <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
          {visibleRecords.map((record) => (
            <article
              key={record.id ?? record.slug}
              className="rounded-lg border border-border/50 bg-background/45 p-4 transition-colors hover:border-primary/35"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{record.name}</p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {record.slug}
                  </p>
                </div>
                {record.id ? (
                  <TaxonomyActionsMenu
                    editHref={editHref(record.id)}
                    isDeleting={isDeleting}
                    itemLabel={itemLabel}
                    record={record}
                    onDelete={onDelete}
                  />
                ) : null}
              </div>
              <p className="mt-4 line-clamp-3 min-h-16 text-sm leading-6 text-muted-foreground">
                {record.description || "No description."}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <TaxonomyStatus record={record} />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    Sort {record.sort_order ?? 0}
                  </span>
                  <PublishedSwitch
                    disabled={isUpdating}
                    itemLabel={itemLabel}
                    record={record}
                    onPublishedChange={onPublishedChange}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <PaginationControls
        isFetching={isFetching}
        meta={meta}
        onPageChange={(page) =>
          setCurrentPage(Math.max(1, Math.min(page, meta.last_page)))
        }
      />
    </section>
  );
}
