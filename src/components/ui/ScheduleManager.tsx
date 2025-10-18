"use client";
// Dependencies
import { useState } from "react";
// Utils
import { DAYS, generateTimeSlots, timeToMinutes } from "@/utils/dates/utils";
// Icons
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Switch } from "./switch";
import Text from "./Text";
import SubTitle from "./SubTitle";
import { Select } from "./select";

const TIME_SLOTS = generateTimeSlots();

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState({
    monday: {
      enabled: true,
      expanded: true,
      slots: [{ id: 1, start: "9:00", end: "13:30" }],
    },
    tuesday: {
      enabled: true,
      expanded: false,
      slots: [{ id: 1, start: "9:30", end: "11:00" }],
    },
    wednesday: {
      enabled: true,
      expanded: false,
      slots: [{ id: 1, start: "9:00", end: "17:00" }],
    },
    thursday: {
      enabled: true,
      expanded: false,
      slots: [{ id: 1, start: "9:00", end: "17:00" }],
    },
    friday: {
      enabled: true,
      expanded: false,
      slots: [{ id: 1, start: "9:00", end: "17:00" }],
    },
    saturday: { enabled: false, expanded: false, slots: [] },
    sunday: { enabled: false, expanded: false, slots: [] },
  });

  const toggleDay = (dayId: keyof typeof schedule) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: !prev[dayId].enabled,
        slots:
          !prev[dayId].enabled && prev[dayId].slots.length === 0
            ? [{ id: Date.now(), start: "9:00", end: "17:00" }]
            : prev[dayId].slots,
      },
    }));
  };

  const toggleExpanded = (dayId: keyof typeof schedule) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        expanded: !prev[dayId].expanded,
      },
    }));
  };

  const updateSlot = (
    dayId: keyof typeof schedule,
    slotId: number,
    field: string,
    value: string
  ) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        slots: prev[dayId].slots.map(slot =>
          slot.id === slotId ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const addSlot = (dayId: keyof typeof schedule) => {
    const currentSlots = schedule[dayId].slots;
    const lastSlot = currentSlots[currentSlots.length - 1];

    let newStart = "9:00";
    let newEnd = "17:00";

    if (lastSlot) {
      const endMinutes = timeToMinutes(lastSlot.end);
      const nextStartMinutes = endMinutes + 30;
      const nextEndMinutes = nextStartMinutes + 60;

      if (nextStartMinutes < 24 * 60) {
        const startHours = Math.floor(nextStartMinutes / 60);
        const startMins = nextStartMinutes % 60;
        newStart = `${startHours.toString().padStart(2, "0")}:${startMins
          .toString()
          .padStart(2, "0")}`;
      }

      if (nextEndMinutes < 24 * 60) {
        const endHours = Math.floor(nextEndMinutes / 60);
        const endMins = nextEndMinutes % 60;
        newEnd = `${endHours.toString().padStart(2, "0")}:${endMins
          .toString()
          .padStart(2, "0")}`;
      }
    }

    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        slots: [
          ...prev[dayId].slots,
          { id: Date.now(), start: newStart, end: newEnd },
        ],
      },
    }));
  };

  const deleteSlot = (dayId: keyof typeof schedule, slotId: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        slots: prev[dayId].slots.filter(slot => slot.id !== slotId),
      },
    }));
  };

  const getAvailableEndTimes = (startTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    return TIME_SLOTS.filter(time => timeToMinutes(time) > startMinutes);
  };

  const formatTimeRange = (slots: { start: string; end: string }[]) => {
    return slots.map(slot => `${slot.start} - ${slot.end}`).join(" · ");
  };

  return (
    <div className="w-full my-6">
      <div className="flex flex-col gap-6 p-2 md:p-6 rounded-2xl shadow-xl ">
        {DAYS.map(day => {
          const daySchedule = schedule[day.id];
          const isEnabled = daySchedule.enabled;
          const isExpanded = daySchedule.expanded;
          console.log({ daySchedule });
          return (
            <div
              key={day.id}
              className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all"
            >
              <div className="flex items-center p-4 bg-gray-50">
                <Switch
                  checked={isEnabled}
                  onClick={() => toggleDay(day.id)}
                  className="relative inline-flex h-7 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{
                    backgroundColor: isEnabled ? "primary" : "gray-300",
                  }}
                />
                <SubTitle
                  text={day.spanish}
                  className="ml-3 font-semibold text-gray-800 flex-1"
                />

                {isEnabled && !isExpanded && (
                  <Text
                    text={formatTimeRange(daySchedule.slots)}
                    className="mr-1"
                  />
                )}

                {isEnabled && (
                  <button
                    onClick={() => toggleExpanded(day.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
              </div>

              {isEnabled && isExpanded && (
                <div className="p-4 space-y-3 bg-white">
                  {daySchedule.slots.map((slot, index) => (
                    <div key={slot.id} className="flex items-center gap-3">
                      <select
                        value={slot.start}
                        onChange={e =>
                          updateSlot(day.id, slot.id, "start", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {TIME_SLOTS.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      <span className="text-gray-500 font-medium">a</span>

                      <select
                        value={slot.end}
                        onChange={e =>
                          updateSlot(day.id, slot.id, "end", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {getAvailableEndTimes(slot.start).map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      <Plus
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors "
                        onClick={() => addSlot(day.id)}
                        size={38}
                      />

                      {daySchedule.slots.length > 1 && (
                        <Trash2
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          size={38}
                          onClick={() => deleteSlot(day.id, slot.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
