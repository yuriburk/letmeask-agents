import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

dayjs.extend(relativeTime)
dayjs.locale('pt-BR')

export function formatDate(date: string | Date): string {
  return dayjs(date).toNow()
}
