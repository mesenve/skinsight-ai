"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { PatientCase } from "@/lib/types";
import {
  getCustomCases,
  mergeCases,
  saveCustomCase,
  updateCustomCase,
} from "@/lib/case-repository";

const STORE_EVENT = "skinsight-cases-updated";
const SERVER_CUSTOM_CASES: PatientCase[] = [];

let cachedCustomCases: PatientCase[] = SERVER_CUSTOM_CASES;
let cachedCustomCasesKey = "";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(STORE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(STORE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function notifyStoreChange() {
  if (typeof window === "undefined") return;
  cachedCustomCasesKey = "";
  window.dispatchEvent(new Event(STORE_EVENT));
}

function readCustomCasesSnapshot(): PatientCase[] {
  if (typeof window === "undefined") return SERVER_CUSTOM_CASES;

  const next = getCustomCases();
  const nextKey = JSON.stringify(next);
  if (nextKey === cachedCustomCasesKey) return cachedCustomCases;

  cachedCustomCasesKey = nextKey;
  cachedCustomCases = next;
  return cachedCustomCases;
}

function getServerCustomCasesSnapshot(): PatientCase[] {
  return SERVER_CUSTOM_CASES;
}

interface CasesContextValue {
  cases: PatientCase[];
  customCases: PatientCase[];
  hydrated: boolean;
  addCase: (patientCase: PatientCase) => PatientCase;
  updateCase: (id: string, patch: Partial<PatientCase>) => PatientCase | undefined;
  getCaseById: (id: string) => PatientCase | undefined;
}

const CasesContext = createContext<CasesContextValue | null>(null);

export function CasesProvider({ children }: { children: React.ReactNode }) {
  const customCases = useSyncExternalStore(
    subscribe,
    readCustomCasesSnapshot,
    getServerCustomCasesSnapshot
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const cases = useMemo(() => mergeCases(customCases), [customCases]);

  const addCase = useCallback((patientCase: PatientCase) => {
    const saved = saveCustomCase(patientCase);
    notifyStoreChange();
    return saved;
  }, []);

  const updateCase = useCallback((id: string, patch: Partial<PatientCase>) => {
    const updated = updateCustomCase(id, patch);
    if (updated) notifyStoreChange();
    return updated;
  }, []);

  const getCaseById = useCallback(
    (id: string) => cases.find((item) => item.id === id),
    [cases]
  );

  const value = useMemo(
    () => ({
      cases,
      customCases,
      hydrated,
      addCase,
      updateCase,
      getCaseById,
    }),
    [cases, customCases, hydrated, addCase, updateCase, getCaseById]
  );

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCases() {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error("useCases must be used within CasesProvider");
  }
  return context;
}
