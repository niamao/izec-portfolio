import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// https://www.reddit.com/user/birdyboy18/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
