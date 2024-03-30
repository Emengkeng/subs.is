'use client';

import { useState } from 'react';

import { updateSummaryFilter } from 'app/actions/user';
import { summaryFilter } from 'config/data';
import { cn } from 'lib/utils';
import { toast } from 'sonner';
import { User } from 'types/data';

import { ArrowDownIcon } from './icons';

export default function SummaryDropdown() {
  const [filterBy, setFilterBy] = useState<keyof typeof summaryFilter>(summaryFilter.monthly.key);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof typeof summaryFilter;
    try {
      setFilterBy(value);
      await updateSummaryFilter(value);
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  return (
    <h2 className="font-medium tracking-wide flex items-center gap-1">
      <label>Total costs</label>
      <div className={cn(`flex mt-[1px] w-fit relative items-center`)}>
        <span className="mr-1">{filterBy === summaryFilter.all.key ? 'for' : 'this'}</span>
        <select
          value={filterBy}
          onChange={onChange}
          className={cn(
            `appearance-none border-b rounded-none border-input bg-transparent w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,
            {
              'w-[35px]': filterBy === summaryFilter.yearly.key,
              'w-[20px]': filterBy === summaryFilter.all.key,
            },
          )}
        >
          {Object.values(summaryFilter).map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <ArrowDownIcon className="ml-0.5 absolute -right-5 h-4 w-4 text-primary" />
      </div>
    </h2>
  );
}
