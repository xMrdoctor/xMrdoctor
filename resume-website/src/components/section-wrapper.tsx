import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({
  children,
  id,
  className,
  title,
  subtitle,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('py-12 md:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {title && (
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-light-foreground sm:text-4xl md:text-5xl dark:text-dark-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-light-muted-foreground sm:mt-4 dark:text-dark-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
