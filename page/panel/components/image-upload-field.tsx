"use client";

import { useId, type SyntheticEvent } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadProjectImageMutation } from "@/redux/api/portfolioApi";

type ImageUploadFieldProps = {
  alt: string;
  value: string;
  onChange: (value: string) => void;
};

export function ImageUploadField({
  alt,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [uploadImage, { isLoading }] = useUploadProjectImageMutation();
  const imageUrl = value.trim();

  const handleFileChange = async (
    event: SyntheticEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = "";

    if (!file) return;

    try {
      const response = await uploadImage(file).unwrap();
      onChange(response.data.url);
      toast.success("Image uploaded.");
    } catch {
      toast.error(
        "Could not upload image. Use JPG, PNG, WEBP, or GIF under 4 MB.",
      );
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor={inputId}
        className={cn(
          "group relative flex min-h-52 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/55 bg-primary/5 p-6 text-center transition-colors hover:border-primary hover:bg-primary/10",
          imageUrl && "min-h-64 border-solid bg-background/45 p-0",
          isLoading && "pointer-events-none opacity-60",
        )}
      >
        {imageUrl ? (
          <>
            <div
              role="img"
              aria-label={alt}
              className="absolute inset-0 bg-cover bg-top transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            />
            <div className="absolute inset-0 bg-background/10 transition-colors group-hover:bg-background/55" />
            <div className="relative z-10 grid place-items-center gap-3 rounded-md bg-background/80 px-4 py-3 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <span className="grid size-11 place-items-center rounded-full bg-background text-primary shadow-sm">
                <ImagePlus className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">
                {isLoading ? "Uploading..." : "Replace image"}
              </span>
            </div>
          </>
        ) : (
          <div className="grid place-items-center gap-4">
            <span className="grid size-16 place-items-center rounded-full bg-background text-primary shadow-sm">
              <ImagePlus className="h-7 w-7" />
            </span>
            <div>
              <p className="text-base font-semibold text-foreground">
                <span className="text-primary">Upload</span>{" "}
                {isLoading ? "Uploading..." : "Select image"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                PNG, JPG, WEBP or GIF image
              </p>
            </div>
          </div>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        disabled={isLoading}
        onChange={handleFileChange}
      />
      {imageUrl ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isLoading}
            onClick={() => {
              onChange("");
              toast.success("Image removed.");
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
