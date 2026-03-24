export type LeadFormPayload = {
  name: string;
  contact: string;
  projectType: string;
  area: string;
  message: string;
  createdAt: string;
};

const LEAD_STORAGE_KEY = "tadilat.leads";

export function saveLead(payload: LeadFormPayload) {
  const current = loadLeads();
  const next = [payload, ...current].slice(0, 20);
  localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(next));
}

export function loadLeads(): LeadFormPayload[] {
  const raw = localStorage.getItem(LEAD_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LeadFormPayload[];
  } catch {
    return [];
  }
}
