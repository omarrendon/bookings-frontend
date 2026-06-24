"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { ReservationsFilters } from "@/lib/api/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  addMonths,
  getDaysInMonth,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Inline mini-calendar (no CSS import, full design-system control) ─────────

interface MiniCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
}

function MiniCalendar({ selected, onSelect }: MiniCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => selected ?? new Date());

  const daysInMonth = getDaysInMonth(viewMonth);
  // Monday-first: (Sun=0 → 6, Mon=1 → 0, …)
  const firstOffset = (startOfMonth(viewMonth).getDay() + 6) % 7;
  const weekDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  return (
    <div className="p-3 w-72 select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewMonth(d => subMonths(d, 1))}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold capitalize">
          {format(viewMonth, "MMMM yyyy", { locale: es })}
        </span>
        <button
          onClick={() => setViewMonth(d => addMonths(d, 1))}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1.5">
        {weekDays.map(d => (
          <div
            key={d}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: firstOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = new Date(
            viewMonth.getFullYear(),
            viewMonth.getMonth(),
            i + 1
          );
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={i}
              onClick={() => onSelect(day)}
              className={cn(
                "mx-auto flex size-8 items-center justify-center rounded-full text-sm transition-colors",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                !isSelected &&
                  isToday &&
                  "bg-primary/10 text-primary font-semibold",
                !isSelected &&
                  !isToday &&
                  "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              aria-label={format(day, "d 'de' MMMM yyyy", { locale: es })}
              aria-pressed={isSelected}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Today shortcut */}
      <div className="mt-3 pt-3 border-t border-border/60 flex justify-center">
        <button
          onClick={() => {
            const today = new Date();
            setViewMonth(today);
            onSelect(today);
          }}
          className="text-xs text-primary hover:underline font-medium"
        >
          Hoy
        </button>
      </div>
    </div>
  );
}

// ─── Status options (mirrors STATUS_CONFIG in ColumnsReservationTable) ────────

const STATUS_OPTIONS = [
  { value: "all",         label: "Todos los estados", className: null },
  { value: "pending",     label: "Pendiente",   className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50" },
  { value: "confirmed",   label: "Confirmada",  className: "bg-primary/10 text-primary border-primary/20" },
  { value: "completed",   label: "Completada",  className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50" },
  { value: "cancelled",   label: "Cancelada",   className: "bg-destructive/10 text-destructive border-destructive/20" },
  { value: "rescheduled", label: "Reprogramada",className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200/50" },
] as const;

// ─── Filter component ─────────────────────────────────────────────────────────

interface FilterReservationsProps {
  onSearch: (filters: ReservationsFilters) => void;
}

export default function FilterReservations({ onSearch }: FilterReservationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const activeCount = [status, date, name, email, phone].filter(Boolean).length;

  const handleClear = () => {
    setStatus("");
    setDate(undefined);
    setName("");
    setEmail("");
    setPhone("");
    onSearch({});
  };

  const handleSearch = () => {
    const filters: ReservationsFilters = {};
    if (status && status !== "all") filters.status = [status];
    if (date) {
      const dateStr = format(date, "yyyy-MM-dd");
      filters.date_from = dateStr;
      filters.date_to = dateStr;
    }
    if (name.trim()) filters.customer_name = name.trim();
    if (email.trim()) filters.customer_email = email.trim();
    if (phone.trim()) filters.customer_phone = phone.trim();
    onSearch(filters);
  };

  return (
    <div>
      {/* ── Always-visible header bar ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <SlidersHorizontal className="size-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold">Filtros de búsqueda</span>
          {activeCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 text-xs h-5 px-1.5"
            >
              {activeCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Button
              variant="outline"
              onClick={handleClear}
              className="gap-2 text-muted-foreground hover:text-foreground border-border/60 min-w-[100px]"
            >
              <X className="size-4" />
              Limpiar filtros
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setIsOpen(v => !v)}
            className="gap-2 border-border/60 min-w-[120px]"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <>
                <ChevronUp className="size-4" />
                Contraer
              </>
            ) : (
              <>
                <SlidersHorizontal className="size-4" />
                Mostrar filtros
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Collapsible content ── */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-5 space-y-4">
            {/* Filter inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Status */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Estado
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-9 bg-background border-border/80 focus-visible:ring-ring">
                    {(() => {
                      const selected = STATUS_OPTIONS.find(o => o.value === status);
                      if (!selected || selected.value === "all" || !selected.className) {
                        return (
                          <span className="text-sm text-muted-foreground">
                            Todos los estados
                          </span>
                        );
                      }
                      return (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            selected.className
                          )}
                        >
                          {selected.label}
                        </span>
                      );
                    })()}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <span className="text-sm text-muted-foreground">
                        Todos los estados
                      </span>
                    </SelectItem>
                    {STATUS_OPTIONS.filter(o => o.value !== "all").map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            opt.className
                          )}
                        >
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Fecha
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-9 justify-start gap-2 font-normal border-border/80 bg-background hover:bg-accent",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-left text-sm truncate">
                        {date
                          ? format(date, "d MMM yyyy", { locale: es })
                          : "Seleccionar fecha"}
                      </span>
                      {date && (
                        <X
                          className="size-3 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                          onClick={e => {
                            e.stopPropagation();
                            setDate(undefined);
                          }}
                        />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-xl border-border/60 shadow-lg"
                    align="start"
                  >
                    <MiniCalendar
                      selected={date}
                      onSelect={d => {
                        setDate(d);
                        setCalendarOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Client name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="filter-name"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Cliente
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="filter-name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nombre..."
                    className="pl-8 h-9 bg-background border-border/80 focus-visible:ring-ring"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="filter-email"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Correo
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="filter-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email..."
                    className="pl-8 h-9 bg-background border-border/80 focus-visible:ring-ring"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="filter-phone"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Teléfono
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="filter-phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Teléfono..."
                    className="pl-8 h-9 bg-background border-border/80 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Search button */}
            <div className="flex justify-end pt-1">
              <Button onClick={handleSearch} className="gap-2 font-medium">
                <Search className="size-4" />
                Buscar reservas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
