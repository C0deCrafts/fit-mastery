import { large_default, small, medium, xLarge, xxLarge } from "@/constants/FontSizes";

export type Theme = "light" | "dark";
export type FontSize = typeof large_default | typeof small | typeof medium | typeof xLarge | typeof xxLarge;
