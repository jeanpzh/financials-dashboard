import Link from "next/link";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icon className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        {actionLabel && actionLink && (
          <Button asChild>
            <Link href={actionLink}>{actionLabel}</Link>
          </Button>
        )}  
        </div>
          </div>
  );
}
