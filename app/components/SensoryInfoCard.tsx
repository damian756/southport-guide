import Link from "next/link";
import { Volume2, Users, MapPin, AlertTriangle, Flower2 } from "lucide-react";

type Level = "low" | "moderate" | "high" | "very-high";

interface SensoryInfoCardProps {
  noiseLevel: Level;
  noiseLevelNote: string;
  crowdDensity: Level;
  crowdDensityNote: string;
  quietSpace: string;
  sensoryTriggers: string[];
  sunflowerNote: string;
  lowSensoryTip: string;
}

const LEVEL_CONFIG: Record<Level, { label: string; color: string; bg: string; dot: string }> = {
  "low":       { label: "Low",       color: "text-green-700",  bg: "bg-green-50 border-green-200",  dot: "bg-green-500" },
  "moderate":  { label: "Moderate",  color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",  dot: "bg-amber-500" },
  "high":      { label: "High",      color: "text-orange-700", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
  "very-high": { label: "Very high", color: "text-red-700",    bg: "bg-red-50 border-red-200",      dot: "bg-red-500" },
};

function LevelBadge({ level, note }: { level: Level; note: string }) {
  const cfg = LEVEL_CONFIG[level];
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 ${cfg.bg}`}>
      <span className={`mt-1.5 flex-none w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
      <div>
        <span className={`font-bold text-sm ${cfg.color}`}>{cfg.label}</span>
        <p className="text-xs text-gray-600 leading-snug mt-0.5">{note}</p>
      </div>
    </div>
  );
}

export default function SensoryInfoCard({
  noiseLevel,
  noiseLevelNote,
  crowdDensity,
  crowdDensityNote,
  quietSpace,
  sensoryTriggers,
  sunflowerNote,
  lowSensoryTip,
}: SensoryInfoCardProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Hidden Disabilities</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Sensory & Accessibility Information</h2>
      </div>

      <div className="bg-[#1C3A20]/5 border border-[#1C3A20]/20 rounded-2xl p-6 md:p-8 space-y-6">
        {/* Sunflower badge strip */}
        <div className="flex items-start gap-4 bg-[#1C3A20] rounded-xl px-5 py-4">
          <Flower2 className="w-5 h-5 text-[#C9A84C] flex-none mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold leading-snug">SouthportGuide is a Sunflower member</p>
            <p className="text-white/65 text-xs leading-relaxed mt-1">
              {sunflowerNote}{" "}
              <Link href="/guides/southportguide-sunflower-member" className="text-[#C9A84C] hover:underline font-medium">
                About our accessibility commitment
              </Link>
            </p>
          </div>
        </div>

        {/* Noise and crowd levels */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-[#1B2E4B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E4B]">Noise Level</span>
            </div>
            <LevelBadge level={noiseLevel} note={noiseLevelNote} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#1B2E4B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E4B]">Crowd Density</span>
            </div>
            <LevelBadge level={crowdDensity} note={crowdDensityNote} />
          </div>
        </div>

        {/* Sensory triggers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#1B2E4B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E4B]">Potential Sensory Triggers</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sensoryTriggers.map((t) => (
              <span key={t} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Quiet space */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#1B2E4B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E4B]">Quiet Space</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{quietSpace}</p>
        </div>

        {/* Low-sensory tip */}
        <div className="border-t border-[#1C3A20]/15 pt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1B2E4B] mb-2">Low-sensory visit tip</p>
          <p className="text-sm text-gray-700 leading-relaxed">{lowSensoryTip}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/guides/autism-friendly-southport"
            className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[#243d63] transition-colors"
          >
            Autism-friendly Southport guide
          </Link>
          <Link
            href="/guides/southportguide-sunflower-member"
            className="inline-flex items-center gap-2 border border-[#1B2E4B]/30 text-[#1B2E4B] text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[#1B2E4B]/5 transition-colors"
          >
            Hidden Disabilities Sunflower
          </Link>
        </div>
      </div>
    </section>
  );
}
