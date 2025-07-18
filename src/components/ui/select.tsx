'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      'min-h-[44px] touch-manipulation select-none cursor-pointer',
      'active:bg-accent/50 active:scale-[0.98] transition-all duration-150',
      '-webkit-tap-highlight-color: transparent',
      'hover:bg-accent/30',
      'relative overflow-hidden',
      'before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-150',
      'active:before:opacity-100',
      className,
    )}
    onTouchStart={(e) => {
      if (navigator.vibrate && typeof navigator.vibrate === 'function') {
        navigator.vibrate(30);
      }
      
      const target = e.currentTarget;
      target.style.transform = 'scale(0.98)';
      
      if (props.onTouchStart) {
        props.onTouchStart(e);
      }
    }}
    onTouchEnd={(e) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1)';
      
      if (props.onTouchEnd) {
        props.onTouchEnd(e);
      }
    }}
    onTouchCancel={(e) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1)';
      
      if (props.onTouchCancel) {
        props.onTouchCancel(e);
      }
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      'min-h-[40px] touch-manipulation',
      'active:bg-accent/50 hover:bg-accent/30',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      'min-h-[40px] touch-manipulation',
      'active:bg-accent/50 hover:bg-accent/30',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-[9999] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        'touch-manipulation overscroll-contain',
        'sm:min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]',
        'overflow-y-auto -webkit-overflow-scrolling: touch',
        'shadow-2xl border-gray-200 bg-white/98 backdrop-blur-sm',
        className,
      )}
      position={position}
      sideOffset={4}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          'touch-manipulation overscroll-contain',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 text-sm font-semibold',
      'min-h-[36px] flex items-center',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'min-h-[44px] touch-manipulation cursor-pointer',
      'active:bg-accent/70 hover:bg-accent/30',
      'transition-colors duration-150',
      'relative overflow-hidden',
      'before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-150',
      'active:before:opacity-100',
      '-webkit-tap-highlight-color: transparent',
      className,
    )}
    onTouchStart={(e) => {
      if (navigator.vibrate && typeof navigator.vibrate === 'function') {
        navigator.vibrate(20);
      }
      
      const target = e.currentTarget;
      target.style.transform = 'scale(0.98)';
      
      if (props.onTouchStart) {
        props.onTouchStart(e);
      }
    }}
    onTouchEnd={(e) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1)';
      
      if (props.onTouchEnd) {
        props.onTouchEnd(e);
      }
    }}
    onTouchCancel={(e) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1)';
      
      if (props.onTouchCancel) {
        props.onTouchCancel(e);
      }
    }}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
