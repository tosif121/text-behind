'use client'

import React, { useEffect } from 'react'; // Import useEffect
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { ALL_FONTS } from '@/app/fonts';
import {Check, LetterTextIcon } from 'lucide-react';


interface FontFamilyPickerProps {
  attribute: string;
  currentFont: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
  attribute,
  currentFont,
  handleAttributeChange
}) => {
  useEffect(() => {
  if (typeof window !== "undefined" && ALL_FONTS?.length > 0) {
    import("webfontloader").then(WebFont => {
      WebFont.load({
        google: {
          families: ALL_FONTS,
        },
      });
    });
  }
}, []);

  return (
    <Popover>
      <div className='flex flex-col items-start justify-start my-2'>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between mt-3 p-2",
              !currentFont && "text-muted-foreground"
            )}
          >
            {currentFont ? currentFont : "Select font family"}
            <LetterTextIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search font family..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No font family found.</CommandEmpty>
            <CommandGroup heading="Fonts">
              {ALL_FONTS.map((font) => (
                <CommandItem
                  value={font}
                  key={font}
                  onSelect={() => handleAttributeChange(attribute, font)}
                  className='hover:cursor-pointer'
                  // This style will now work as the fonts have been loaded
                  style={{ fontFamily: font }}
                >
                  {font}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      font === currentFont ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FontFamilyPicker;