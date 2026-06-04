import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/basePath";
import {
  getCloudinaryImageUrl,
  isCloudinaryPublicId,
} from "@/lib/cloudinary";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string") return src;

  if (isCloudinaryPublicId(src)) {
    return getCloudinaryImageUrl(src);
  }

  if (src.startsWith("/")) {
    return withBasePath(src);
  }

  return src;
}

export default function AppImage({ src, alt = "", ...props }: ImageProps) {
  return <Image src={resolveSrc(src)} alt={alt} {...props} />;
}
