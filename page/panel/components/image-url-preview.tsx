type ImageUrlPreviewProps = {
  alt: string;
  src: string;
};

export function ImageUrlPreview({ alt, src }: ImageUrlPreviewProps) {
  const imageUrl = src.trim();

  if (!imageUrl) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-md border border-border/50 bg-background/45">
      <div
        role="img"
        aria-label={alt}
        className="aspect-[16/9] bg-cover bg-top"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
    </div>
  );
}
