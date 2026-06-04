/** Public Cloudinary cloud name — safe to commit; used as fallback when env is unset in CI */
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dc0g30mss";

export function isCloudinaryPublicId(src: string) {
  return !src.startsWith("/") && !src.startsWith("http");
}

export function getCloudinaryImageUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
}
