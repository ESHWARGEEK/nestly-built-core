import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { usePreferences, type Preferences } from "@/hooks/usePreferences";
import { uniqueLocations, uniqueExperiences } from "@/data/jobs";
import { toast } from "@/hooks/use-toast";

const modes = ["Remote", "Hybrid", "Onsite"] as const;

const Settings = () => {
  const { preferences, save } = usePreferences();
  const [form, setForm] = useState<Preferences>(preferences);

  const set = <K extends keyof Preferences>(key: K, val: Preferences[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const toggleLocation = (loc: string) => {
    set(
      "preferredLocations",
      form.preferredLocations.includes(loc)
        ? form.preferredLocations.filter((l) => l !== loc)
        : [...form.preferredLocations, loc],
    );
  };

  const toggleMode = (mode: string) => {
    set(
      "preferredModes",
      form.preferredModes.includes(mode)
        ? form.preferredModes.filter((m) => m !== mode)
        : [...form.preferredModes, mode],
    );
  };

  const handleSave = () => {
    save(form);
    toast({ title: "Preferences saved", description: "Your matching criteria have been updated." });
  };

  return (
    <main className="flex-1 px-s4 py-s4 max-w-2xl mx-auto w-full">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        Tracking Preferences
      </h1>
      <p className="mt-s1 text-base text-muted-foreground">
        Configure what kind of jobs you want to receive each morning.
      </p>

      <Card className="mt-s4">
        <CardHeader>
          <CardTitle className="text-lg">Job Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-s3">
          {/* Role Keywords */}
          <div className="space-y-s1">
            <Label htmlFor="keywords">Role Keywords</Label>
            <Input
              id="keywords"
              placeholder="e.g. Frontend, SDE, Python Developer"
              value={form.roleKeywords}
              onChange={(e) => set("roleKeywords", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Comma-separated keywords matched against job titles & descriptions.</p>
          </div>

          {/* Preferred Locations */}
          <div className="space-y-s1">
            <Label>Preferred Locations</Label>
            <div className="flex flex-wrap gap-s2 pt-1">
              {uniqueLocations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={form.preferredLocations.includes(loc)}
                    onCheckedChange={() => toggleLocation(loc)}
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div className="space-y-s1">
            <Label>Work Mode</Label>
            <div className="flex gap-s3 pt-1">
              {modes.map((mode) => (
                <label key={mode} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={form.preferredModes.includes(mode)}
                    onCheckedChange={() => toggleMode(mode)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-s1">
            <Label>Experience Level</Label>
            <Select
              value={form.experienceLevel}
              onValueChange={(v) => set("experienceLevel", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {uniqueExperiences.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e === "Fresher" ? "Fresher" : `${e} yrs`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="space-y-s1">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              placeholder="e.g. React, Java, SQL, Python"
              value={form.skills}
              onChange={(e) => set("skills", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Comma-separated. Matched against job skill requirements.</p>
          </div>

          {/* Min Match Score */}
          <div className="space-y-s1">
            <Label>Minimum Match Score: {form.minMatchScore}%</Label>
            <Slider
              value={[form.minMatchScore]}
              onValueChange={([v]) => set("minMatchScore", v)}
              min={0}
              max={100}
              step={5}
              className="py-2"
            />
            <p className="text-xs text-muted-foreground">
              Jobs scoring below this won't appear when "Show only matches" is enabled.
            </p>
          </div>

          <Button className="mt-s2" onClick={handleSave}>
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Settings;
