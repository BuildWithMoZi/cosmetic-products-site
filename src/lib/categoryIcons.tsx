import { IconType } from "react-icons";
import {
  HiSparkles,
  HiBeaker,
  HiCloud,
  HiSun,
  HiSwatch,
  HiEye,
  HiPaintBrush,
  HiHomeModern,
  HiFaceSmile,
} from "react-icons/hi2";
import { GiLips, GiHairStrands, GiFlowerPot } from "react-icons/gi";
import { Category } from "@/types/product";

export const categoryIconMap: Record<Category, IconType> = {
  skincare: HiSparkles,
  serums: HiBeaker,
  moisturizers: HiCloud,
  "sun-protection": HiSun,
  lips: GiLips,
  complexion: HiSwatch,
  eyes: HiEye,
  haircare: GiHairStrands,
  "body-care": HiHomeModern,
  fragrance: GiFlowerPot,
  tools: HiPaintBrush,
  "masks-treatments": HiFaceSmile,
};

interface CategoryIconProps {
  category: Category;
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const Icon = categoryIconMap[category];
  return <Icon className={className} aria-hidden />;
}
