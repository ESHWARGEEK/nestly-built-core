import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uniqueLocations, uniqueModes, uniqueExperiences, uniqueSources } from "@/data/jobs";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const FilterBar = ({ filters, onChange }: Props) => {
  const set = (key: keyof Filters, val: string) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className="flex flex-col gap-s2 sm:flex-row sm:flex-wrap sm:items-end">
      {/* Keyword */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title or company…"
          value={filters.keyword}
          onChange={(e) => set("keyword", e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Location */}
      <Select value={filters.location} onValueChange={(v) => set("location", v)}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {uniqueLocations.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mode */}
      <Select value={filters.mode} onValueChange={(v) => set("mode", v)}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modes</SelectItem>
          {uniqueModes.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Experience */}
      <Select value={filters.experience} onValueChange={(v) => set("experience", v)}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {uniqueExperiences.map((e) => (
            <SelectItem key={e} value={e}>
              {e === "Fresher" ? "Fresher" : `${e} yrs`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Source */}
      <Select value={filters.source} onValueChange={(v) => set("source", v)}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {uniqueSources.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={filters.sort} onValueChange={(v) => set("sort", v)}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="az">A → Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
