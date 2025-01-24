import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGradientText = (text: string, from: string = "from-blue-600", via: string = "via-indigo-600", to: string = "to-blue-600") => {
  return {
    className: `highlight-text bg-gradient-to-r ${from} ${via} ${to} bg-[length:200%] bg-clip-text text-transparent`,
    children: text,
  }
}

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}
