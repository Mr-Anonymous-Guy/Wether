import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Loader2 } from "lucide-react";
import { searchCities } from "@/lib/weather";
import type { GeoLocation } from "@/types/weather";

interface Props {
  onSelect: (loc: GeoLocation) => void;
}

export function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reqId = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    const id = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await searchCities(q);
        if (id === reqId.current) {
          setResults(r);
          setActiveIndex(0);
          setOpen(true);
        }
      } catch {
        if (id === reqId.current) setResults([]);
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  const pick = (r: GeoLocation) => {
    onSelect(r);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="glass-panel flex items-center gap-3 rounded-full px-5 py-3">
        <Search size={18} className="text-white/80" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && results[activeIndex]) {
              e.preventDefault();
              pick(results[activeIndex]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search city..."
          className="flex-1 bg-transparent text-white placeholder:text-white/60 outline-none text-sm"
        />
        {loading && <Loader2 size={16} className="animate-spin text-white/80" />}
      </div>
      <AnimatePresence>
        {open && query.trim() && (results.length > 0 || !loading) && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-panel absolute z-20 mt-2 w-full overflow-hidden rounded-2xl py-2"
          >
            {results.length === 0 ? (
              <li className="px-4 py-2 text-sm text-white/70">No cities found</li>
            ) : results.map((r, i) => (
              <li key={`${r.name}-${i}`}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(r);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-white transition ${
                    i === activeIndex ? "bg-white/20" : "hover:bg-white/15"
                  }`}
                >
                  <MapPin size={14} className="text-white/70" />
                  <span className="font-medium">{r.name}</span>
                  {r.country && <span className="text-white/60">· {r.country}</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}