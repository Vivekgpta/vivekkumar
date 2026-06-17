import { useEffect, useState, useCallback } from "react";
import type { Work } from "@/data/works";

const STORAGE_KEY = "vivek_custom_works_v1";

function read(): Work[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Work[];
  } catch {
    return [];
  }
}

function write(items: Work[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("custom-works-updated"));
}

export function useCustomWorks() {
  const [items, setItems] = useState<Work[]>([]);

  useEffect(() => {
    setItems(read());
    const refresh = () => setItems(read());
    window.addEventListener("custom-works-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("custom-works-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const add = useCallback((work: Work) => {
    const next = [work, ...read()];
    write(next);
    setItems(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter((w) => w.id !== id);
    write(next);
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    write([]);
    setItems([]);
  }, []);

  return { items, add, remove, clear };
}
