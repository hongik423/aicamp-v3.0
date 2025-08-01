'use client';

import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

interface RatingScaleProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function RatingScale({ 
  label, 
  value, 
  onChange,
  min = 1,
  max = 5 
}: RatingScaleProps) {
  const scales = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  
  return (
    <FormItem>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <FormLabel className="flex-1 text-sm">{label}</FormLabel>
        <div className="flex gap-1 md:gap-2">
          {scales.map((scale) => (
            <label key={scale} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                value={scale}
                checked={value === scale}
                onChange={() => onChange(scale)}
                className="sr-only"
              />
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all text-sm md:text-base font-medium ${
                value === scale 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-110' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}>
                {scale}
              </div>
            </label>
          ))}
        </div>
      </div>
    </FormItem>
  );
}