export type PublicTestimonial = {
  id: string;
  quote: string;
  name: string;
  business: string;
  focus: string;
  rating?: number;
};

export type AdminTestimonial = PublicTestimonial & {
  isPublished: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

async function parseJson(res: Response) {
  const text = await res.text();
  if (!text) {
    throw new Error(
      res.status === 502 || res.status === 500
        ? "Backend unavailable. Start the API: cd backend && npm run dev"
        : `Empty response (${res.status})`
    );
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    const snippet = text.replace(/\s+/g, " ").trim().slice(0, 120);
    if (/internal server error/i.test(snippet) || res.status >= 500) {
      throw new Error(
        "Backend unavailable. Start MongoDB, then run: cd backend && npm run dev"
      );
    }
    throw new Error(snippet || `Invalid server response (${res.status})`);
  }
}

async function requestData<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: "no-store",
  });

  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Request failed"));
  }
  return json.data as T;
}

export async function fetchPublishedTestimonials(): Promise<PublicTestimonial[]> {
  try {
    return await requestData<PublicTestimonial[]>("/testimonials");
  } catch {
    return [];
  }
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Login failed"));
  }
  return json as {
    success: true;
    token: string;
    admin: { id: string; email: string; name: string };
  };
}

export async function fetchAdminMe(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Unauthorized"));
  }
  return json.admin as { id: string; email: string; name: string };
}

export function fetchAllTestimonials(token: string) {
  return requestData<AdminTestimonial[]>("/testimonials/admin/all", { token });
}

export function createTestimonial(
  token: string,
  body: {
    quote: string;
    name: string;
    business: string;
    focus: string;
    rating?: number;
    isPublished?: boolean;
  }
) {
  return requestData<AdminTestimonial>("/testimonials/admin", {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });
}

export function updateTestimonial(
  token: string,
  id: string,
  body: Partial<{
    quote: string;
    name: string;
    business: string;
    focus: string;
    rating: number;
    isPublished: boolean;
    sortOrder: number;
  }>
) {
  return requestData<AdminTestimonial>(`/testimonials/admin/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(body),
  });
}

export function setTestimonialPublished(token: string, id: string, isPublished: boolean) {
  return requestData<AdminTestimonial>(`/testimonials/admin/${id}/publish`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ isPublished }),
  });
}

export async function deleteTestimonial(token: string, id: string) {
  const res = await fetch(`${API_BASE}/testimonials/admin/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Delete failed"));
  }
}

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "spam";
export type LeadSource = "home" | "contact" | "ads" | "other";
export type LeadHasWebsite = "yes" | "no";
export type LeadLaunchTimeline = "urgent" | "2-4-weeks" | "1-2-months" | "exploring";

export type AdminLead = {
  id: string;
  service: string;
  brief: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  hasWebsite?: LeadHasWebsite | "";
  websiteUrl?: string;
  launchTimeline?: LeadLaunchTimeline | "";
  budget?: string;
  status: LeadStatus;
  source: LeadSource;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LeadStats = Record<LeadStatus, number>;

export async function submitLead(body: {
  service: string;
  brief: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  source?: LeadSource;
  hasWebsite?: LeadHasWebsite | "";
  websiteUrl?: string;
  launchTimeline?: LeadLaunchTimeline | "";
  budget?: string;
}) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Could not submit proposal"));
  }
  return json.data as { id: string };
}

export async function fetchAllLeads(token: string, status?: LeadStatus) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`${API_BASE}/leads/admin/all${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Failed to load leads"));
  }
  return {
    data: json.data as AdminLead[],
    meta: (json.meta || { total: 0, stats: {} }) as {
      total: number;
      stats: Partial<LeadStats>;
    },
  };
}

export function updateLead(
  token: string,
  id: string,
  body: Partial<{ status: LeadStatus; notes: string }>
) {
  return requestData<AdminLead>(`/leads/admin/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(body),
  });
}

export async function deleteLead(token: string, id: string) {
  const res = await fetch(`${API_BASE}/leads/admin/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await parseJson(res);
  if (!res.ok || !json.success) {
    throw new Error(String(json.message || "Delete failed"));
  }
}

