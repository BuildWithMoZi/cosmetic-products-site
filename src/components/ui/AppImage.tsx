import Image, { type ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";
import { withBasePath } from "@/lib/basePath";

/**
 * Returns true when `src` is a Cloudinary public_id (e.g. "cosmetic-site/products/1").
 * Local paths start with "/" and remote URLs start with "http".
 */
function isCloudinaryPublicId(src: string) {
  return !src.startsWith("/") && !src.startsWith("http");
}

export default function AppImage({ src, alt = "", ...props }: ImageProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (typeof src === "string" && cloudName && isCloudinaryPublicId(src)) {
    return (
      <CldImage
        src={src}
        alt={alt}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
    );
  }

  const resolvedSrc =
    typeof src === "string" && src.startsWith("/")
      ? withBasePath(src)
      : src;

  return <Image src={resolvedSrc} alt={alt} {...props} />;
}
