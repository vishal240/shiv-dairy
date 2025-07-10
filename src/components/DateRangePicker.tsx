import React, { useState, useRef, useEffect } from "react";
import { DateRange, type RangeKeyDict } from "react-date-range";
import {
  subDays,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker: React.FC = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: subDays(new Date(), 29),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    console.log(selectionRange);
  }, [selectionRange]);

  const [hasSelected, setHasSelected] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const predefinedRanges = [
    {
      label: "Today",
      range: () => ({
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      }),
    },
    {
      label: "Yesterday",
      range: () => {
        const yesterday = subDays(new Date(), 1);
        return {
          startDate: startOfDay(yesterday),
          endDate: endOfDay(yesterday),
        };
      },
    },
    {
      label: "Last 7 Days",
      range: () => ({
        startDate: subDays(new Date(), 6),
        endDate: new Date(),
      }),
    },
    {
      label: "Last 30 Days",
      range: () => ({
        startDate: subDays(new Date(), 29),
        endDate: new Date(),
      }),
    },
    {
      label: "This Month",
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      }),
    },
    {
      label: "Last Month",
      range: () => {
        const lastMonth = subDays(startOfMonth(new Date()), 1);
        return {
          startDate: startOfMonth(lastMonth),
          endDate: endOfMonth(lastMonth),
        };
      },
    },
  ];

  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges.selection;
    setSelectionRange({
      startDate: range.startDate!,
      endDate: range.endDate!,
      key: "selection",
    });
    setHasSelected(true);
  };

  const handlePresetClick = (preset: any) => {
    setSelectionRange({ ...preset.range(), key: "selection" });
    setHasSelected(true);
  };

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="custom_date_picker position-relative"
      ref={pickerRef}
      onClick={() => setShowPicker((prev) => !prev)}
    >
      <div className="date_show">
        <strong>
          {hasSelected
            ? `${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`
            : "Select Date"}
        </strong>
      </div>

      <div className={`datefilter ${showPicker ? "" : "d-none"}`}>
        <div className="timeframe my-2">
          {predefinedRanges.map((preset) => (
            <button
              key={preset.label}
              onClick={(e) => {
                e.stopPropagation(); // prevent parent toggle
                handlePresetClick(preset);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <DateRange
          ranges={[selectionRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          rangeColors={["#007bff"]}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
