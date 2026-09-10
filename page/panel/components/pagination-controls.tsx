import { Button } from "@/components/ui/button";
import type { PaginatedData } from "@/constants/types";
import { cn } from "@/lib/utils";

export type PaginationMeta = NonNullable<PaginatedData<unknown>["meta"]>;

type PaginationControlsProps = {
  className?: string;
  isFetching?: boolean;
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
};

export function getPaginationSummary(meta?: PaginationMeta) {
  if (!meta || meta.total === 0) return "Showing 0 of 0";

  const currentPage = Math.min(meta.current_page, meta.last_page);
  const from = (currentPage - 1) * meta.per_page + 1;
  const to = Math.min(currentPage * meta.per_page, meta.total);

  return `Showing ${from} to ${to} of ${meta.total}`;
}

export function PaginationControls({
  className,
  isFetching = false,
  meta,
  onPageChange,
}: PaginationControlsProps) {
  if (!meta || meta.last_page <= 1) return null;

  const pages = getVisiblePages(meta.current_page, meta.last_page);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {getPaginationSummary(meta)}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isFetching || meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            size="sm"
            variant={page === meta.current_page ? "default" : "outline"}
            disabled={isFetching}
            className="min-w-8 px-2"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isFetching || meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function getVisiblePages(currentPage: number, lastPage: number) {
  const start = Math.max(1, Math.min(currentPage - 2, lastPage - 4));
  const end = Math.min(lastPage, start + 4);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
