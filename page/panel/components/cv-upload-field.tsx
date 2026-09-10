"use client";

import { useId, type SyntheticEvent } from "react";
import { ExternalLink, FileText, FileUp, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadCvMutation } from "@/redux/api/portfolioApi";

type CvUploadFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

function getFileName(value: string) {
  const fileName = value.split("/").filter(Boolean).at(-1);
  if (!fileName) return "Selected CV";

  try {
    return decodeURIComponent(fileName);
  } catch {
    return fileName;
  }
}

export function CvUploadField({ value, onChange }: CvUploadFieldProps) {
  const inputId = useId();
  const [uploadCv, { isLoading }] = useUploadCvMutation();
  const fileUrl = value.trim();

  const handleFileChange = async (
    event: SyntheticEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = "";

    if (!file) return;

    try {
      const response = await uploadCv(file).unwrap();
      onChange(response.data.url);
      toast.success("CV uploaded.");
    } catch {
      toast.error("Could not upload CV. Use PDF, DOC, or DOCX under 8 MB.");
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor={inputId}
        className={cn(
          "flex min-h-44 cursor-pointer items-center justify-center rounded-lg border border-dashed border-primary/55 bg-primary/5 p-6 text-center transition-colors hover:border-primary hover:bg-primary/10",
          fileUrl && "border-solid bg-background/45",
          isLoading && "pointer-events-none opacity-60",
        )}
      >
        <div className="grid place-items-center gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-background text-primary shadow-sm">
            {fileUrl ? (
              <FileText className="h-7 w-7" />
            ) : (
              <FileUp className="h-7 w-7" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">
              <span className="text-primary">Upload</span>{" "}
              {isLoading
                ? "Uploading..."
                : fileUrl
                  ? "Replace file"
                  : "Select file"}
            </p>
            <p className="mt-1 max-w-md truncate text-sm text-muted-foreground">
              {fileUrl ? getFileName(fileUrl) : "PDF, DOC or DOCX file"}
            </p>
          </div>
        </div>
      </label>
      <input
        id={inputId}
        type="file"
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        disabled={isLoading}
        onChange={handleFileChange}
      />
      {fileUrl ? (
        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor={inputId}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              isLoading && "pointer-events-none opacity-60",
            )}
          >
            <FileUp className="h-4 w-4" />
            {isLoading ? "Uploading..." : "Replace CV"}
          </label>
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                isLoading && "pointer-events-none opacity-60",
              )}
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                onChange("");
                toast.success("CV removed.");
              }}
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
        </div>
      ) : null}
    </div>
  );
}
