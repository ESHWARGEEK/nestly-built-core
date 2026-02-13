import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
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
              placeholder="e.g. Frontend Engineer, Product Designer"
            />
          </div>

          {/* Preferred Locations */}
          <div className="space-y-s1">
            <Label htmlFor="locations">Preferred Locations</Label>
            <Input
              id="locations"
              placeholder="e.g. Bangalore, Mumbai, Delhi"
            />
          </div>

          {/* Mode */}
          <div className="space-y-s1">
            <Label>Work Mode</Label>
            <RadioGroup defaultValue="remote" className="flex gap-s3 pt-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote" className="font-normal">Remote</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="font-normal">Hybrid</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="onsite" id="onsite" />
                <Label htmlFor="onsite" className="font-normal">Onsite</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Experience Level */}
          <div className="space-y-s1">
            <Label>Experience Level</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0–2 yrs)</SelectItem>
                <SelectItem value="mid">Mid Level (3–5 yrs)</SelectItem>
                <SelectItem value="senior">Senior (6–10 yrs)</SelectItem>
                <SelectItem value="lead">Lead / Staff (10+ yrs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-s2" disabled>
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Settings;
