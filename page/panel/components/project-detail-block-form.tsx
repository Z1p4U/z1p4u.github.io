"use client";

import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectDetailSectionPayload } from "@/constants/types";

import { Field, SwitchField } from "./dashboard-field";
import { ImageUploadField } from "./image-upload-field";
import { nullable, statusText } from "../lib/helpers";
import type { DetailFormState } from "../types";

const detailBlockTypes: DetailFormState["block_type"][] = [
  "overview",
  "challenge",
  "contribution",
  "implementation",
  "result",
];

const detailLayouts: DetailFormState["layout"][] = [
  "image_left",
  "image_right",
  "full_width",
  "text_only",
];

export function formatDetailLabel(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function buildDetailPayload(
  detailForm: DetailFormState,
): ProjectDetailSectionPayload {
  return {
    block_type: detailForm.block_type,
    layout: detailForm.layout,
    title: detailForm.title,
    body: detailForm.body,
    image_url: nullable(detailForm.image_url),
    image_alt: nullable(detailForm.image_alt),
    caption: nullable(detailForm.caption),
    external_url: nullable(detailForm.external_url),
    sort_order: Number(detailForm.sort_order || 0),
    is_published: detailForm.is_published,
  };
}

export function ProjectDetailBlockForm({
  canSubmit = true,
  detailForm,
  isSaving,
  setDetailForm,
  submitLabel,
  title,
  onCancel,
  onSubmit,
}: {
  canSubmit?: boolean;
  detailForm: DetailFormState;
  isSaving: boolean;
  setDetailForm: Dispatch<SetStateAction<DetailFormState>>;
  submitLabel: string;
  title: string;
  onCancel: () => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border/50 bg-background/35 p-4"
    >
      <h3 className="mb-5 font-semibold">{title}</h3>
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Type">
            <Select
              value={detailForm.block_type}
              onValueChange={(value) =>
                setDetailForm((current) => ({
                  ...current,
                  block_type: value as DetailFormState["block_type"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {detailBlockTypes.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDetailLabel(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Layout">
            <Select
              value={detailForm.layout}
              onValueChange={(value) =>
                setDetailForm((current) => ({
                  ...current,
                  layout: value as DetailFormState["layout"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {detailLayouts.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatDetailLabel(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Title">
          <Input
            value={detailForm.title}
            onChange={(event) =>
              setDetailForm((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            required
          />
        </Field>
        <Field label="Body">
          <Textarea
            rows={6}
            value={detailForm.body}
            onChange={(event) =>
              setDetailForm((current) => ({
                ...current,
                body: event.target.value,
              }))
            }
            required
          />
        </Field>
        <Field label="Block Image">
          <ImageUploadField
            alt={`${detailForm.title || "Contribution block"} preview`}
            value={detailForm.image_url}
            onChange={(imageUrl) =>
              setDetailForm((current) => ({
                ...current,
                image_url: imageUrl,
              }))
            }
          />
        </Field>
        <Field label="Image Alt">
          <Input
            value={detailForm.image_alt}
            onChange={(event) =>
              setDetailForm((current) => ({
                ...current,
                image_alt: event.target.value,
              }))
            }
          />
        </Field>
        <Field label="Caption">
          <Input
            value={detailForm.caption}
            onChange={(event) =>
              setDetailForm((current) => ({
                ...current,
                caption: event.target.value,
              }))
            }
          />
        </Field>
        <Field label="External URL">
          <Input
            value={detailForm.external_url}
            onChange={(event) =>
              setDetailForm((current) => ({
                ...current,
                external_url: event.target.value,
              }))
            }
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
          <Field label="Sort Order">
            <Input
              type="number"
              value={detailForm.sort_order}
              onChange={(event) =>
                setDetailForm((current) => ({
                  ...current,
                  sort_order: event.target.value,
                }))
              }
            />
          </Field>
          <SwitchField
            label="Published"
            checked={detailForm.is_published}
            onCheckedChange={(checked) =>
              setDetailForm((current) => ({
                ...current,
                is_published: checked,
              }))
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={!canSubmit || isSaving}>
            <FileText className="h-4 w-4" />
            {statusText(isSaving) ?? submitLabel}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
