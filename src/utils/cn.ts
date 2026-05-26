export type ClassValue = string | number | bigint | boolean | undefined | null;

export function cn(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(' ');
}