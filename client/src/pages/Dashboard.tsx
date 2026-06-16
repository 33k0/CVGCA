import React from "react";
import { API_BASE } from "../api";

export type Sponsor = {
  id: number;
  images: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FeaturedEvent = {
  id: number;
  title: string;
  date: string;
  venue: string;
  decription: string;
  link: string;
  Image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type OldHighlight = {
  id: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EventRow = {
  id: number;
  title: string;
  date?: string;
  venue: string;
  decription: string;
  ticketlink?: string;
  time?: string;
  Image: string;
  createdAt?: string;
  updatedAt?: string;
};

type EventName = { id: number; title: string; createdAt?: string; updatedAt?: string };

type GalleryEventRow = {
  id: number;
  title: string;
  date: string;
  image: string;
  drivelink: string;
  createdAt?: string;
  updatedAt?: string;
};

type GalleryImageRow = {
  id: number;
  image: string;
  galleryEventId: number;

  _eventTitle?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminDashboard() {
  const [tab, setTab] = React.useState<
  | "sponsors"
  | "featured"
  | "events"
  | "old"
  | "photostack"
  | "blogs"
  | "eventnames"
  | "gallery_events"
  | "gallery_images"
>("sponsors");
  return (
    <div className="mx-auto max-w-6xl p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>

      <div className="mb-6 inline-flex rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setTab("sponsors")}
          className={`px-4 py-2 text-sm ${
            tab === "sponsors"
              ? "bg-gray-900 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          Sponsors
        </button>
        <button
          onClick={() => setTab("featured")}
          className={`px-4 py-2 text-sm ${
            tab === "featured"
              ? "bg-gray-900 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          Featured Events
        </button>
        <button
          onClick={() => setTab("old")}
          className={`px-4 py-2 text-sm ${
            tab === "old"
              ? "bg-gray-900 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          Old Highlights
        </button>
        <button
          onClick={() => setTab("photostack")}
          className={`px-4 py-2 text-sm ${
            tab === "photostack"
              ? "bg-gray-900 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          Photostack
        </button>
        <button
  onClick={() => setTab("events")}
  className={`px-4 py-2 text-sm ${
    tab === "events" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
  }`}
>
  Events
</button>
<button
  onClick={() => setTab("blogs")}
  className={`px-4 py-2 text-sm ${tab === "blogs" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
>
  Blogs
</button>
<button
  onClick={() => setTab("eventnames")}
  className={`px-4 py-2 text-sm ${tab === "eventnames" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
>
  Event Names
</button>
<button
  onClick={() => setTab("gallery_events")}
  className={`px-4 py-2 text-sm ${tab === "gallery_events" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
>
  Gallery Events
</button>
<button
  onClick={() => setTab("gallery_images")}
  className={`px-4 py-2 text-sm ${tab === "gallery_images" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
>
  Gallery Images
</button>
      </div>

      {tab === "sponsors" ? (
  <SponsorsPanel />
) : tab === "featured" ? (
  <FeaturedEventsPanel />
) : tab === "events" ? (
  <EventsPanel />
) : tab === "old" ? (
  <OldHighlightsPanel />
) : tab === "photostack" ? (
  <PhotostackPanel />
) : tab === "eventnames" ? (
  <EventNamesPanel />
) : tab === "gallery_events" ? (
  <GalleryEventsPanel_Linked />
) : tab === "gallery_images" ? (
  <GalleryImagesPanel_Linked />
) : (
  <BlogsPanel />
)}

    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium text-gray-700">{children}</label>
  );
}

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  const data = await res.json();
  if (!data?.url) throw new Error("Upload response missing url");
  return data.url as string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayISODate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function composeLocal(
  datePart: string,
  hour12: string,
  minute: string,
  ap: "AM" | "PM"
): string {
  if (!datePart) return "";
  let h = parseInt(hour12 || "12", 10) % 12;
  if (ap === "PM") h += 12;
  return `${datePart}T${pad(h)}:${pad(parseInt(minute || "0", 10))}`;
}

function formatForDB(local: string): string {
  if (!local) return "";
  const [date, hm] = local.split("T");
  const [H, M] = (hm || "00:00").split(":").map(Number);
  const ap = H >= 12 ? "PM" : "AM";
  const h12 = H % 12 === 0 ? 12 : H % 12;
  return `${date} ${h12}:${pad(M)} ${ap}`;
}

function parseStoredToParts(stored: string): {
  date: string;
  hour: string;
  minute: string;
  ap: "AM" | "PM";
} {
  const m = stored?.match(
    /^(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );
  if (!m) return { date: "", hour: "5", minute: "00", ap: "PM" };
  const [, date, hh, mm, apRaw] = m;
  return {
    date,
    hour: String(parseInt(hh, 10)),
    minute: mm,
    ap: apRaw.toUpperCase() as "AM" | "PM",
  };
}

export function formatEventDatePretty(stored: string): string {
  const m = parseStoredToParts(stored);
  if (!m.date) return stored || "";

  const H24 = ((parseInt(m.hour, 10) % 12) + (m.ap === "PM" ? 12 : 0)) % 24;
  const dt = new Date(`${m.date}T${pad(H24)}:${m.minute}:00`);
  const weekday = dt.toLocaleDateString(undefined, { weekday: "short" });
  const month = dt.toLocaleDateString(undefined, { month: "short" });
  const day = dt.getDate();
  return `${weekday}, ${month} ${day} • ${parseInt(m.hour, 10)}:${pad(
    parseInt(m.minute, 10)
  )} ${m.ap}`;
}

function composeTime(h: string, m: string, ap: "AM" | "PM") {
  return `${h}:${m} ${ap}`;
}

function parseTime(str?: string): { hour: string; minute: string; ap: "AM" | "PM" } {
  const m = (str || "").match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return { hour: "5", minute: "00", ap: "PM" };
  return { hour: m[1], minute: m[2], ap: (m[3].toUpperCase() as "AM" | "PM") };
}

function formatEventDatePrettyEV(yyyyMmDd: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(yyyyMmDd)) return yyyyMmDd;
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function SponsorsPanel() {
  const [items, setItems] = React.useState<Sponsor[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [link, setLink] = React.useState("");

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Partial<Sponsor>>({});

  React.useEffect(() => {
    void fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/sponsors`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load sponsors");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!file) return setError("Please choose an image to upload");
    if (!link.trim()) return setError("Please provide a link for this sponsor");

    try {
      const uploadedUrl = await uploadImage(file);
      const res = await fetch(`${API_BASE}/sponsors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: uploadedUrl, link: link.trim() }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setFile(null);
      const node = document.getElementById(
        "s-file-input"
      ) as HTMLInputElement | null;
      if (node) node.value = "";
      setLink("");
      setSuccess("Sponsor added");
    } catch (e: any) {
      setError(e?.message || "Failed to add sponsor");
    }
  }

  function beginEdit(item: Sponsor) {
    setEditingId(item.id);
    setDraft({ images: item.images, link: item.link });
  }
  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }
  async function saveEdit(id: number) {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/sponsors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      setItems((prev) =>
        prev.map((it) => (it.id === id ? ({ ...it, ...draft } as Sponsor) : it))
      );
      cancelEdit();
      setSuccess("Sponsor updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update sponsor");
    }
  }
  async function removeItem(id: number) {
    if (!confirm("Delete this sponsor?")) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/sponsors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((it) => it.id !== id));
      setSuccess("Sponsor deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete sponsor");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Sponsors</h2>

      <form
        onSubmit={createItem}
        className="mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
      >
        <div className="md:col-span-3">
          <FieldLabel>Image *</FieldLabel>
          <input
            id="s-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            JPG/PNG/SVG — uploaded via /upload, saved URL in DB.
          </p>
        </div>
        <div className="md:col-span-3">
          <FieldLabel>Link *</FieldLabel>
          <input
            type="url"
            placeholder="https://partner-site.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="md:col-span-6 flex items-end justify-end gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]"
          >
            Upload & Add
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">
          {success}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Preview
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Image URL
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Link
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No sponsors yet
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-24 h-14 overflow-hidden rounded-lg bg-gray-100">

                      <img
                        src={item.images}
                        alt="sponsor"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {editingId === item.id ? (
                      <input
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft.images ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, images: e.target.value }))
                        }
                      />
                    ) : (
                      <a
                        className="text-blue-600 underline break-all"
                        href={item.images}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.images}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {editingId === item.id ? (
                      <input
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft.link ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, link: e.target.value }))
                        }
                      />
                    ) : (
                      <a
                        className="text-blue-600 underline break-all"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.link}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-right space-x-2">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-lg border px-3 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => beginEdit(item)}
                          className="rounded-lg border px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Flow: pick an image → Upload & Add → it uploads to /upload and saves URL
        & link to /sponsors.
      </p>
    </>
  );
}

function FeaturedEventsPanel() {
  const [items, setItems] = React.useState<FeaturedEvent[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState("");
  const [datePart, setDatePart] = React.useState(todayISODate());
  const [hour, setHour] = React.useState("5");
  const [minute, setMinute] = React.useState("00");
  const [ap, setAp] = React.useState<"AM" | "PM">("PM");
  const [venue, setVenue] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<
    Partial<FeaturedEvent> & {
      _date?: string;
      _hour?: string;
      _minute?: string;
      _ap?: "AM" | "PM";
    }
  >({});

  React.useEffect(() => {
    void fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/featuredevent`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load featured events");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !title.trim() ||
      !datePart ||
      !venue.trim() ||
      !description.trim() ||
      !link.trim()
    )
      return setError("Please fill in all required fields");
    if (!file) return setError("Please choose an image to upload");

    try {
      const uploadedUrl = await uploadImage(file);
      const local = composeLocal(datePart, hour, minute, ap);
      const payload = {
        title: title.trim(),
        date: formatForDB(local),
        venue: venue.trim(),
        description: description.trim(),
        link: link.trim(),
        image: uploadedUrl,
      };

      const res = await fetch(`${API_BASE}/featuredevent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);

      setTitle("");
      setDatePart(todayISODate());
      setHour("5");
      setMinute("00");
      setAp("PM");
      setVenue("");
      setDescription("");
      setLink("");
      setFile(null);
      const node = document.getElementById(
        "fe-file-input"
      ) as HTMLInputElement | null;
      if (node) node.value = "";
      setSuccess("Featured event added");
    } catch (e: any) {
      setError(e?.message || "Failed to add featured event");
    }
  }

  function beginEdit(item: FeaturedEvent) {
    const parts = parseStoredToParts(item.date);
    setEditingId(item.id);
    setDraft({
      title: item.title,
      date: item.date,
      venue: item.venue,
      decription: item.decription,
      link: item.link,
      Image: item.Image,
      _date: parts.date || todayISODate(),
      _hour: parts.hour || "5",
      _minute: parts.minute || "00",
      _ap: parts.ap || "PM",
    });
  }
  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }

  async function saveEdit(id: number) {
    setError(null);
    setSuccess(null);
    try {
      const patch: Partial<FeaturedEvent> & {
        _date?: string;
        _hour?: string;
        _minute?: string;
        _ap?: "AM" | "PM";
      } = { ...draft };

      if (patch._date || patch._hour || patch._minute || patch._ap) {
        const d =
          patch._date ??
          parseStoredToParts(items.find((x) => x.id === id)!.date).date;
        const h = patch._hour ?? "5";
        const m = patch._minute ?? "00";
        const apv = (patch._ap ?? "PM") as "AM" | "PM";
        patch.date = formatForDB(composeLocal(d, h, m, apv));
      }

      delete (patch as any)._date;
      delete (patch as any)._hour;
      delete (patch as any)._minute;
      delete (patch as any)._ap;

      const res = await fetch(`${API_BASE}/featuredevent/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);

      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? ({ ...it, ...patch } as FeaturedEvent) : it
        )
      );
      cancelEdit();
      setSuccess("Featured event updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update featured event");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this featured event?")) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/featuredevent/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((it) => it.id !== id));
      setSuccess("Featured event deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete featured event");
    }
  }

  const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const MINUTES = Array.from({ length: 60 }, (_, i) => pad(i));

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Featured Events (Please only put one)
      </h2>

      <form
        onSubmit={createItem}
        className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
      >
        <div className="md:col-span-6">
          <FieldLabel>Title *</FieldLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Garba & Dandiya Night 2025"
            required
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Date *</FieldLabel>
          <input
            type="date"
            value={datePart}
            min={todayISODate()}
            onChange={(e) => setDatePart(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <FieldLabel>Hours</FieldLabel>
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Minutes</FieldLabel>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              >
                {MINUTES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>AM / PM</FieldLabel>
              <select
                value={ap}
                onChange={(e) => setAp(e.target.value as "AM" | "PM")}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Will save as:{" "}
            <span className="font-mono">
              {formatForDB(composeLocal(datePart, hour, minute, ap)) ||
                "YYYY-MM-DD h:MM AM/PM"}
            </span>
          </p>
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Venue *</FieldLabel>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Mountain House High School Stadium"
            required
          />
        </div>
        <div className="md:col-span-6">
          <FieldLabel>Ticket / Info Link *</FieldLabel>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="https://bit.ly/cvgcagarba2025"
            required
          />
        </div>
        <div className="md:col-span-12">
          <FieldLabel>Description *</FieldLabel>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Music, dance, and community vibes. Limited tickets!"
            rows={3}
            required
          />
        </div>
        <div className="md:col-span-12">
          <FieldLabel>Event Image *</FieldLabel>
          <input
            id="fe-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload to /upload; saved URL is stored in the DB.
          </p>
        </div>
        <div className="md:col-span-12 flex items-end justify-end gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]"
          >
            Upload & Add
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">
          {success}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Preview
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title & Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Venue
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Link / Image URL
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No featured events yet
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const isEditing = editingId === item.id;
                const parts = isEditing
                  ? {
                      date: draft._date!,
                      hour: draft._hour!,
                      minute: draft._minute!,
                      ap: draft._ap!,
                    }
                  : parseStoredToParts(item.date);

                return (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">

                        <img
                          src={item.Image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <>
                          <input
                            className="w-full rounded-lg border px-2 py-1"
                            value={(draft.title as string) ?? ""}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, title: e.target.value }))
                            }
                          />
                          <textarea
                            className="w-full rounded-lg border px-2 py-1 mt-1"
                            rows={2}
                            value={
                              (draft.decription as string) ?? item.decription
                            }
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                decription: e.target.value,
                              }))
                            }
                          />
                        </>
                      ) : (
                        <>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.decription}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="date"
                            className="w-full rounded-lg border px-2 py-1"
                            value={parts.date}
                            min={todayISODate()}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, _date: e.target.value }))
                            }
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <span className="text-xs text-gray-600">
                                Hours
                              </span>
                              <select
                                className="w-full rounded-lg border px-2 py-1"
                                value={parts.hour}
                                onChange={(e) =>
                                  setDraft((d) => ({
                                    ...d,
                                    _hour: e.target.value,
                                  }))
                                }
                              >
                                {Array.from({ length: 12 }, (_, i) =>
                                  String(i + 1)
                                ).map((h) => (
                                  <option key={h}>{h}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">
                                Minutes
                              </span>
                              <select
                                className="w-full rounded-lg border px-2 py-1"
                                value={parts.minute}
                                onChange={(e) =>
                                  setDraft((d) => ({
                                    ...d,
                                    _minute: e.target.value,
                                  }))
                                }
                              >
                                {Array.from({ length: 60 }, (_, i) =>
                                  pad(i)
                                ).map((m) => (
                                  <option key={m}>{m}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">
                                AM / PM
                              </span>
                              <select
                                className="w-full rounded-lg border px-2 py-1"
                                value={parts.ap}
                                onChange={(e) =>
                                  setDraft((d) => ({
                                    ...d,
                                    _ap: e.target.value as "AM" | "PM",
                                  }))
                                }
                              >
                                <option>AM</option>
                                <option>PM</option>
                              </select>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Will save as:{" "}
                            <span className="font-mono">
                              {formatForDB(
                                composeLocal(
                                  parts.date,
                                  parts.hour,
                                  parts.minute,
                                  parts.ap
                                )
                              )}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="font-mono">{item.date}</div>
                          <div className="text-xs text-gray-500">
                            {formatEventDatePretty(item.date)}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <input
                          className="w-full rounded-lg border px-2 py-1"
                          value={(draft.venue as string) ?? item.venue}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, venue: e.target.value }))
                          }
                        />
                      ) : (
                        item.venue
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <>
                          <input
                            className="w-full rounded-lg border px-2 py-1"
                            value={(draft.link as string) ?? item.link}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, link: e.target.value }))
                            }
                          />
                          <input
                            className="w-full rounded-lg border px-2 py-1 mt-1"
                            value={(draft.Image as string) ?? item.Image}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, Image: e.target.value }))
                            }
                            placeholder="Image URL"
                          />
                        </>
                      ) : (
                        <>
                          <a
                            className="text-blue-600 underline break-all"
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.link}
                          </a>
                          <div className="text-xs text-gray-500 break-all mt-1">
                            {item.Image}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top text-right space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border px-3 py-1"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => beginEdit(item)}
                            className="rounded-lg border px-3 py-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Flow: fill fields → Upload & Add → image uploads to /upload, URL saved
        with details to /featuredevent.
      </p>
    </>
  );
}
function OldHighlightsPanel() {
  const [items, setItems] = React.useState<OldHighlight[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Partial<OldHighlight>>({});

  React.useEffect(() => {
    void fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/oldhighlights`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load old highlights");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!file) return setError("Please choose an image to upload");

    try {
      const uploadedUrl = await uploadImage(file);
      const res = await fetch(`${API_BASE}/oldhighlights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedUrl }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setFile(null);
      const node = document.getElementById(
        "oh-file-input"
      ) as HTMLInputElement | null;
      if (node) node.value = "";
      setSuccess("Old highlight added");
    } catch (e: any) {
      setError(e?.message || "Failed to add old highlight");
    }
  }

  function beginEdit(item: OldHighlight) {
    setEditingId(item.id);
    setDraft({ image: item.image });
  }
  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }

  async function saveEdit(id: number) {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/oldhighlights/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: (draft.image || "").trim() }),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, image: draft.image as string } : it
        )
      );
      cancelEdit();
      setSuccess("Old highlight updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update old highlight");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this old highlight?")) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/oldhighlights/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((it) => it.id !== id));
      setSuccess("Old highlight deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete old highlight");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Old Highlights</h2>

      <form
        onSubmit={createItem}
        className="mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
      >
        <div className="md:col-span-6">
          <FieldLabel>Image *</FieldLabel>
          <input
            id="oh-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Uploads to <code>/upload</code>, then saves the returned URL to{" "}
            <code>/oldhighlights</code>.
          </p>
        </div>
        <div className="md:col-span-6 flex items-end justify-end gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]"
          >
            Upload & Add
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">
          {success}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Preview
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Image URL
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  No old highlights yet
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">

                      <img
                        src={item.image}
                        alt="old highlight"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {editingId === item.id ? (
                      <input
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft.image ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, image: e.target.value }))
                        }
                      />
                    ) : (
                      <a
                        className="text-blue-600 underline break-all"
                        href={item.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.image}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-right space-x-2">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-lg border px-3 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => beginEdit(item)}
                          className="rounded-lg border px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Flow: pick an image → Upload & Add → it uploads to /upload and saves URL
        to /oldhighlights.
      </p>
    </>
  );
}
function PhotostackPanel() {
  type PhotostackRow = { id: number; image: string; createdAt?: string; updatedAt?: string };

  const [items, setItems] = React.useState<PhotostackRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Partial<PhotostackRow>>({});

  React.useEffect(() => { void fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/photostack`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load photostack images");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setSuccess(null);

    if (!file) return setError("Please choose an image to upload");

    try {
      const uploadedUrl = await uploadImage(file);
      const res = await fetch(`${API_BASE}/photostack`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedUrl }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setFile(null);
      const node = document.getElementById("ps-file-input") as HTMLInputElement | null;
      if (node) node.value = "";
      setSuccess("Photostack image added");
    } catch (e: any) {
      setError(e?.message || "Failed to add photostack image");
    }
  }

  function beginEdit(item: PhotostackRow) {
    setEditingId(item.id);
    setDraft({ image: item.image });
  }
  function cancelEdit() { setEditingId(null); setDraft({}); }

  async function saveEdit(id: number) {
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/photostack/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: (draft.image || "").trim() }),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      setItems((prev) => prev.map((it) => (it.id === id ? ({ ...it, image: draft.image as string }) : it)));
      cancelEdit();
      setSuccess("Photostack image updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update photostack image");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this photostack image?")) return;
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/photostack/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((it) => it.id !== id));
      setSuccess("Photostack image deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete photostack image");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Photostack (Hero slideshow)</h2>

      <form onSubmit={createItem} className="mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
        <div className="md:col-span-6">
          <FieldLabel>Image *</FieldLabel>
          <input
            id="ps-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Uploads to <code>/upload</code>, then saves the returned URL to <code>/photostack</code>.
          </p>
        </div>
        <div className="md:col-span-6 flex items-end justify-end gap-3">
          <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]">
            Upload & Add
          </button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{success}</div>}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image URL</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-500">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-500">No photostack images yet</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">

                      <img src={item.image} alt="photostack" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {editingId === item.id ? (
                      <input
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft.image ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
                      />
                    ) : (
                      <a className="text-blue-600 underline break-all" href={item.image} target="_blank" rel="noreferrer">
                        {item.image}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-right space-x-2">
                    {editingId === item.id ? (
                      <>
                        <button onClick={() => saveEdit(item.id)} className="rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700">Save</button>
                        <button onClick={cancelEdit} className="rounded-lg border px-3 py-1">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => beginEdit(item)} className="rounded-lg border px-3 py-1">Edit</button>
                        <button onClick={() => removeItem(item.id)} className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">Flow: pick image → Upload & Add → saved to /photostack.</p>
    </>
  );
}

function EventsPanel() {
  const [items, setItems] = React.useState<EventRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ticketlink, setTicketlink] = React.useState("");
  const [datePart, setDatePart] = React.useState("");
  const [hour, setHour] = React.useState("5");
  const [minute, setMinute] = React.useState("00");
  const [ap, setAp] = React.useState<"AM" | "PM">("PM");
  const [includeTime, setIncludeTime] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<
    Partial<EventRow> & {
      _date?: string;
      _hour?: string;
      _minute?: string;
      _ap?: "AM" | "PM";
      _includeTime?: boolean;
    }
  >({});

  const HOURS = React.useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1)), []);
  const MINUTES = React.useMemo(() => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")), []);

  React.useEffect(() => { void fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true); setError(null);
      const res = await fetch(`${API_BASE}/events`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setSuccess(null);

    if (!title.trim() || !venue.trim() || !description.trim())
      return setError("Please fill in Title, Venue, and Description");
    if (!file) return setError("Please choose an image to upload");

    try {
      const uploadedUrl = await uploadImage(file);

      const payload = {
        title: title.trim(),
        venue: venue.trim(),
        description: description.trim(),
        ticketlink: ticketlink.trim() || undefined,
        date: datePart || undefined,
        time: includeTime ? composeTime(hour, minute, ap) : undefined,
        image: uploadedUrl,
      };

      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);

      const created: EventRow = await res.json();
      setItems((prev) => [created, ...prev]);

      setTitle(""); setVenue(""); setDescription(""); setTicketlink("");
      setDatePart(""); setHour("5"); setMinute("00"); setAp("PM"); setIncludeTime(false);
      setFile(null);
      const node = document.getElementById("ev-file-input") as HTMLInputElement | null;
      if (node) node.value = "";
      setSuccess("Event added");
    } catch (e: any) {
      setError(e?.message || "Failed to add event");
    }
  }

  function beginEdit(item: EventRow) {
    const parsed = parseTime(item.time);
    setEditingId(item.id);
    setDraft({
      title: item.title,
      venue: item.venue,
      decription: item.decription,
      ticketlink: item.ticketlink,
      date: item.date,
      time: item.time,
      Image: item.Image,
      _date: item.date || "",
      _hour: parsed.hour,
      _minute: parsed.minute,
      _ap: parsed.ap,
      _includeTime: Boolean(item.time),
    });
  }
  function cancelEdit() { setEditingId(null); setDraft({}); }

  async function saveEdit(id: number) {
    setError(null); setSuccess(null);
    try {
      const patch: any = { ...draft };

      if ("_date" in patch) {
        patch.date = patch._date || "";
      }

      if ("_includeTime" in patch) {
        if (patch._includeTime) {
          const h = patch._hour ?? "5";
          const m = patch._minute ?? "00";
          const apv = (patch._ap ?? "PM") as "AM" | "PM";
          patch.time = composeTime(h, m, apv);
        } else {
          patch.time = "";
        }
      }

      delete patch._date;
      delete patch._hour;
      delete patch._minute;
      delete patch._ap;
      delete patch._includeTime;

      const res = await fetch(`${API_BASE}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);

      setItems((prev) => prev.map((it) => (it.id === id ? ({ ...it, ...patch } as EventRow) : it)));
      cancelEdit();
      setSuccess("Event updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update event");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this event?")) return;
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((it) => it.id !== id));
      setSuccess("Event deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete event");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Events (general list)</h2>

      <form
        onSubmit={createItem}
        className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm"
      >
        <div className="md:col-span-6">
          <FieldLabel>Title *</FieldLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Navratri Social"
            required
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Venue *</FieldLabel>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Community Center"
            required
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Date (optional)</FieldLabel>
          <input
            type="date"
            value={datePart}
            onChange={(e) => setDatePart(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-2">Stored exactly as YYYY-MM-DD.</p>
        </div>

        <div className="md:col-span-6">
          <FieldLabel >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeTime}
                onChange={(e) => setIncludeTime(e.target.checked)}
                className="rounded ml-3"
              />
              Time (specific) - Check to edit time
            </div>
          </FieldLabel>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <FieldLabel>Hours</FieldLabel>
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                disabled={!includeTime}
              >
                {HOURS.map((h) => (<option key={h}>{h}</option>))}
              </select>
            </div>
            <div>
              <FieldLabel>Minutes</FieldLabel>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                disabled={!includeTime}
              >
                {MINUTES.map((m) => (<option key={m}>{m}</option>))}
              </select>
            </div>
            <div>
              <FieldLabel>AM / PM</FieldLabel>
              <select
                value={ap}
                onChange={(e) => setAp(e.target.value as "AM" | "PM")}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                disabled={!includeTime}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {includeTime ? <>Will save as: <span className="font-mono">{composeTime(hour, minute, ap)}</span></> : "Uncheck to omit time"}
          </p>
        </div>

        <div className="md:col-span-12">
          <FieldLabel>Description *</FieldLabel>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="All are welcome!"
            rows={3}
            required
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Ticket / Info Link (optional)</FieldLabel>
          <input
            type="url"
            value={ticketlink}
            onChange={(e) => setTicketlink(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/tickets"
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Event Image *</FieldLabel>
          <input
            id="ev-file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Uploads to /upload; URL saved to /events.</p>
        </div>

        <div className="md:col-span-12 flex items-end justify-end gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]"
          >
            Upload & Add
          </button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{success}</div>}

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title & Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Venue</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Link / Image URL</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">No events yet</td></tr>
            ) : (
              items.map((item) => {
                const isEditing = editingId === item.id;

                return (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">
                        <img src={item.Image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <>
                          <input
                            className="w-full rounded-lg border px-2 py-1"
                            value={(draft.title as string) ?? item.title}
                            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                          />
                          <textarea
                            className="w-full rounded-lg border px-2 py-1 mt-1"
                            rows={2}
                            value={(draft.decription as string) ?? item.decription}
                            onChange={(e) => setDraft((d) => ({ ...d, decription: e.target.value }))}
                          />
                        </>
                      ) : (
                        <>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.decription}</div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <div className="space-y-3">

                          <div>
                            <span className="text-xs text-gray-600">Date</span>
                            <input
                              type="date"
                              className="w-full rounded-lg border px-2 py-1"
                              value={draft._date ?? (item.date || "")}
                              onChange={(e) => setDraft((d) => ({ ...d, _date: e.target.value }))}
                            />
                          </div>

                          {(() => {
                            const parsed = parseTime((draft.time as string) || item.time || "");
                            const hourVal = draft._hour ?? parsed.hour;
                            const minuteVal = draft._minute ?? parsed.minute;
                            const apVal = (draft._ap ?? parsed.ap) as "AM" | "PM";
                            const hasTime = typeof draft._includeTime === "boolean"
                              ? draft._includeTime
                              : Boolean(item.time);

                            return (
                              <div>
                                <label className="text-xs text-gray-600 flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={hasTime}
                                    onChange={(e) =>
                                      setDraft((d) => ({ ...d, _includeTime: e.target.checked }))
                                    }
                                    className="rounded"
                                  />
                                  Time
                                </label>
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                  <select
                                    className="w-full rounded-lg border px-2 py-1"
                                    value={hourVal}
                                    onChange={(e) => setDraft((d) => ({ ...d, _hour: e.target.value }))}
                                    disabled={!hasTime}
                                  >
                                    {HOURS.map((h) => (<option key={h}>{h}</option>))}
                                  </select>
                                  <select
                                    className="w-full rounded-lg border px-2 py-1"
                                    value={minuteVal}
                                    onChange={(e) => setDraft((d) => ({ ...d, _minute: e.target.value }))}
                                    disabled={!hasTime}
                                  >
                                    {MINUTES.map((m) => (<option key={m}>{m}</option>))}
                                  </select>
                                  <select
                                    className="w-full rounded-lg border px-2 py-1"
                                    value={apVal}
                                    onChange={(e) => setDraft((d) => ({ ...d, _ap: e.target.value as "AM" | "PM" }))}
                                    disabled={!hasTime}
                                  >
                                    <option>AM</option>
                                    <option>PM</option>
                                  </select>
                                </div>
                                {hasTime && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Will save as: <span className="font-mono">{composeTime(hourVal, minuteVal, apVal)}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <>
                          <div className="font-mono">{item.date || "—"}</div>
                          {item.date && (
                            <div className="text-xs text-gray-500">
                              {formatEventDatePrettyEV(item.date)}
                            </div>
                          )}
                          {item.time && (
                            <div className="text-xs text-gray-600 mt-1">{item.time}</div>
                          )}
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <input
                          className="w-full rounded-lg border px-2 py-1"
                          value={(draft.venue as string) ?? item.venue}
                          onChange={(e) => setDraft((d) => ({ ...d, venue: e.target.value }))}
                        />
                      ) : (
                        item.venue
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      {isEditing ? (
                        <>
                          <input
                            className="w-full rounded-lg border px-2 py-1"
                            placeholder="Ticket / Info Link"
                            value={(draft.ticketlink as string) ?? (item.ticketlink || "")}
                            onChange={(e) => setDraft((d) => ({ ...d, ticketlink: e.target.value }))}
                          />
                          <input
                            className="w-full rounded-lg border px-2 py-1 mt-1"
                            value={(draft.Image as string) ?? item.Image}
                            onChange={(e) => setDraft((d) => ({ ...d, Image: e.target.value }))}
                            placeholder="Image URL"
                          />
                        </>
                      ) : (
                        <>
                          {item.ticketlink ? (
                            <a className="text-blue-600 underline break-all" href={item.ticketlink} target="_blank" rel="noreferrer">
                              {item.ticketlink}
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                          <div className="text-xs text-gray-500 break-all mt-1">{item.Image}</div>
                        </>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top text-right space-x-2 whitespace-nowrap">
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdit(item.id)} className="rounded-lg bg-blue-600 text-white px-3 py-1 hover:bg-blue-700">Save</button>
                          <button onClick={cancelEdit} className="rounded-lg border px-3 py-1">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => beginEdit(item)} className="rounded-lg border px-3 py-1">Edit</button>
                          <button onClick={() => removeItem(item.id)} className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Required: Title, Venue, Description, Image. Optional: Date (YYYY-MM-DD), Time (h:mm AM/PM), Ticket link.
      </p>
    </>
  );
}

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import FileHandler from "@tiptap/extension-file-handler";

import { Link as LinkIcon, Unlink, Image as ImageIcon } from "lucide-react";

function BlogsPanel() {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [thumbUrl, setThumbUrl] = React.useState("");
  const [thumbName, setThumbName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const editor = useEditor({
    extensions: [

      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Strike,
      Underline,
      Link.configure({
  openOnClick: false,
  autolink: true,
  linkOnPaste: true,
  HTMLAttributes: {
    class: "underline underline-offset-2 decoration-sky-400 hover:decoration-2 text-sky-400 hover:text-sky-300",
  },
}),
      Image.configure({ allowBase64: true }),

      FileHandler.configure({
        allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
        onDrop: async (ed, files) => {
          const f = files[0]; if (!f) return;
          const url = await uploadImage(f);
          ed.chain().focus().setImage({ src: url }).run();
        },
        onPaste: async (ed, files) => {
          const f = files[0]; if (!f) return;
          const url = await uploadImage(f);
          ed.chain().focus().setImage({ src: url }).run();
        },
      }),
    ],
    content: "<p>Start writing…</p>",
  });

  async function onThumbChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setThumbName(f.name);
    const url = await uploadImage(f);
    setThumbUrl(url);
  }

  async function onInlineImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
  }

  function addThumbIntoEditor() {
    if (thumbUrl && editor) editor.chain().focus().setImage({ src: thumbUrl }).run();
  }

  function addOrEditLink() {
    if (!editor) return;
    const url = window.prompt("Enter the URL");
    if (!url) return;
    const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;

    const payload = {
      title: title.trim(),
      author: author.trim(),
      date: new Date().toISOString(),
      image: thumbUrl,
      content: editor.getJSON(),
      minidescription: summary.trim(),
      topics: genre || undefined,
    };

    try {
      const res = await fetch(`${API_BASE}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Failed (${res.status})`);
      setMessage("Blog created!");

      setTitle(""); setAuthor(""); setGenre(""); setSummary(""); setThumbUrl(""); setThumbName("");
      editor.commands.setContent("<p>Start writing…</p>");
    } catch (err: any) {
      setMessage(err?.message || "Network error submitting blog.");
    }
  }

  if (!editor) return null;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Blogs</h2>

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
        <div className="md:col-span-6">
          <FieldLabel>Title *</FieldLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Post title"
            required
          />
        </div>
        <div className="md:col-span-6">
          <FieldLabel>Author *</FieldLabel>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            required
          />
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Topic</FieldLabel>
          <input
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
  className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
  placeholder="Topic (e.g., News or comma-separated)"
/>
        </div>

        <div className="md:col-span-6">
          <FieldLabel>Thumbnail *</FieldLabel>
          <input
            type="file"
            accept="image/*"
            onChange={onThumbChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          {thumbName && <p className="text-xs text-gray-500 mt-1">Selected: {thumbName}</p>}
          {thumbUrl && <img src={thumbUrl} alt="thumb" className="mt-2 h-24 w-40 rounded-lg object-cover" />}
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={addThumbIntoEditor} className="rounded-lg border px-3 py-1">
              Insert into editor
            </button>
          </div>
        </div>

        <div className="md:col-span-12">
          <FieldLabel>Short Summary *</FieldLabel>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="50–100 words"
            required
          />
        </div>

        <div className="md:col-span-12">
          <FieldLabel>Content *</FieldLabel>

          <div className="rounded-xl border border-gray-200 p-2">
            <EditorContent editor={editor} className="tiptap prose prose-invert max-w-none" />
          </div>

          <FloatingMenu
            editor={editor}
            shouldShow={({ state }) => {
              const { $from } = state.selection;
              return $from.parent.type.name === "paragraph" && state.selection.empty;
            }}
            options={{ placement: "top", }}
          >
            <div className="hidden" />
          </FloatingMenu>

          <BubbleMenu
            editor={editor}
            options={{ placement: "top", }}
          >
            <div className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-2 py-1 shadow">

              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("bold") ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("italic") ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("underline") ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("strike") ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>

              <div className="mx-1 h-5 w-px bg-gray-200" />

              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("heading", { level: 1 }) ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("heading", { level: 2 }) ? "bg-blue-50 border-blue-300" : ""}`} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>

              <div className="mx-1 h-5 w-px bg-gray-200" />

              <button type="button" className={`px-2 py-1 rounded-lg border ${editor.isActive("link") ? "bg-blue-50 border-blue-300" : ""}`} onClick={addOrEditLink} aria-label="Link">
                <LinkIcon className="h-4 w-4" />
              </button>
              <button type="button" className="px-2 py-1 rounded-lg border" onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}  aria-label="Unlink">
                <Unlink className="h-4 w-4" />
              </button>

              <label className="px-2 py-1 rounded-lg border cursor-pointer inline-flex items-center gap-1">
                <input type="file" hidden accept="image/*" onChange={onInlineImage} />
                <ImageIcon className="h-4 w-4" /> Image
              </label>
            </div>
          </BubbleMenu>
        </div>

        <div className="md:col-span-12 flex items-end justify-end gap-3">
          <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 active:scale-[.99]">
            Publish Blog
          </button>
        </div>
      </form>

      {message && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{message}</div>}
      <p className="text-xs text-gray-500">Flow: upload thumbnail → write → Publish (saves to /blogs).</p>
    </>
  );
}

function EventNamesPanel() {
  const [items, setItems] = React.useState<EventName[]>([]);
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draftTitle, setDraftTitle] = React.useState("");

  React.useEffect(() => { void fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true); setError(null);
      const res = await fetch(`${API_BASE}/eventnames`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load event names");
    } finally { setLoading(false); }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault(); setError(null); setSuccess(null);
    if (!title.trim()) return setError("Please enter a title");
    try {
      const res = await fetch(`${API_BASE}/eventnames`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setTitle(""); setSuccess("Event name added");
    } catch (e: any) {
      setError(e?.message || "Failed to add event name");
    }
  }

  async function saveEdit(id: number) {
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/eventnames/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: draftTitle.trim() }),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      setItems((prev) => prev.map((x) => (x.id === id ? { ...x, title: draftTitle.trim() } : x)));
      setEditingId(null); setDraftTitle(""); setSuccess("Event name updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this event name?")) return;
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/eventnames/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((x) => x.id !== id));
      setSuccess("Event name deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Event Names (Allowed titles)</h2>

      <form onSubmit={createItem} className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4 bg-white border border-gray-200 p-4 rounded-2xl">
        <div className="md:col-span-5">
          <FieldLabel>Title *</FieldLabel>
          <input className="mt-1 w-full rounded-xl border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="md:col-span-1 flex items-end justify-end">
          <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2">Add</button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{success}</div>}

      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} className="px-4 py-6 text-center text-gray-500">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={2} className="px-4 py-6 text-center text-gray-500">No event names yet</td></tr>
            ) : items.map((it) => (
              <tr key={it.id} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  {editingId === it.id ? (
                    <input className="w-full rounded-lg border px-2 py-1" value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} />
                  ) : it.title}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {editingId === it.id ? (
                    <>
                      <button onClick={() => saveEdit(it.id)} className="rounded-lg bg-blue-600 text-white px-3 py-1">Save</button>
                      <button onClick={() => (setEditingId(null), setDraftTitle(""))} className="rounded-lg border px-3 py-1">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => (setEditingId(it.id), setDraftTitle(it.title))} className="rounded-lg border px-3 py-1">Edit</button>
                      <button onClick={() => removeItem(it.id)} className="rounded-lg bg-red-600 text-white px-3 py-1">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function GalleryEventsPanel_Linked() {
  const [items, setItems] = React.useState<GalleryEventRow[]>([]);
  const [names, setNames] = React.useState<EventName[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [titleId, setTitleId] = React.useState<number | "">("");
  const [datePart, setDatePart] = React.useState<string>(todayISODate());
  const [drivelink, setDrivelink] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Partial<GalleryEventRow> & { _titleId?: number | ""; _date?: string }>({});

  React.useEffect(() => { void Promise.all([fetchNames(), fetchItems()]); }, []);

  async function fetchNames() {
    try {
      const r = await fetch(`${API_BASE}/eventnames`);
      const data = await r.json();
      setNames(Array.isArray(data) ? data : data?.data || []);
    } catch {}
  }
  async function fetchItems() {
    try {
      setLoading(true); setError(null);
      const r = await fetch(`${API_BASE}/galleryevents`);
      if (!r.ok) throw new Error(`Fetch failed (${r.status})`);
      const data = await r.json();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (e:any) {
      setError(e?.message || "Failed to load gallery events");
    } finally { setLoading(false); }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault(); setError(null); setSuccess(null);
    if (!titleId) return setError("Select an Event Title");
    if (!datePart) return setError("Pick a date");
    if (!file) return setError("Choose a cover image");
    if (!drivelink.trim()) return setError("Provide the Drive folder link");

    try {
      const url = await uploadImage(file);
      const picked = names.find(n => n.id === Number(titleId))!;
      const payload = { title: picked.title, date: datePart, image: url, drivelink: drivelink.trim() };

      const r = await fetch(`${API_BASE}/galleryevents`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error(`Create failed (${r.status})`);
      const created = await r.json();
      setItems(prev => [created, ...prev]);

      setTitleId(""); setDatePart(todayISODate()); setDrivelink(""); setFile(null);
      const node = document.getElementById("ge-file-input") as HTMLInputElement | null;
      if (node) node.value = "";
      setSuccess("Gallery event added");
    } catch (e:any) {
      setError(e?.message || "Failed to add gallery event");
    }
  }

  async function saveEdit(id: number) {
    setError(null); setSuccess(null);
    try {
      const patch: any = { ...draft };
      if ("_titleId" in patch) {
        const picked = names.find(n => n.id === Number(patch._titleId));
        if (picked) patch.title = picked.title;
        delete patch._titleId;
      }
      if ("_date" in patch) {
        patch.date = patch._date || "";
        delete patch._date;
      }
      const r = await fetch(`${API_BASE}/galleryevents/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch)
      });
      if (!r.ok) throw new Error(`Update failed (${r.status})`);
      setItems(prev => prev.map(x => x.id === id ? ({ ...x, ...patch }) as GalleryEventRow : x));
      setEditingId(null); setDraft({});
      setSuccess("Gallery event updated");
    } catch (e:any) {
      setError(e?.message || "Failed to update");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this gallery event? (All its images will be deleted)")) return;
    setError(null); setSuccess(null);
    try {
      const r = await fetch(`${API_BASE}/galleryevents/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error(`Delete failed (${r.status})`);
      setItems(prev => prev.filter(x => x.id !== id));
      setSuccess("Gallery event deleted");
    } catch (e:any) {
      setError(e?.message || "Failed to delete");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Gallery Events</h2>

      <form onSubmit={createItem} className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-gray-200 p-4 rounded-2xl">
        <div className="md:col-span-4">
          <FieldLabel>Event Title *</FieldLabel>
          <select
            value={titleId}
            onChange={(e) => setTitleId(e.target.value ? Number(e.target.value) : "")}
            className="mt-1 w-full rounded-xl border px-3 py-2" required
          >
            <option value="">Select from Event Names…</option>
            {names.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Titles come from the Eventnames table.</p>
        </div>

        <div className="md:col-span-4">
          <FieldLabel>Date *</FieldLabel>
          <input
            type="date"
            value={datePart}
            onChange={(e) => setDatePart(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Saved exactly as <span className="font-mono">{datePart}</span>.</p>
        </div>

        <div className="md:col-span-4">
          <FieldLabel>Drive Folder Link *</FieldLabel>
          <input
            type="url"
            value={drivelink}
            onChange={(e) => setDrivelink(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="https://drive.google.com/drive/..."
            required
          />
        </div>

        <div className="md:col-span-12">
          <FieldLabel>Cover Image *</FieldLabel>
          <input
            id="ge-file-input"
            type="file" accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
            required
          />
        </div>

        <div className="md:col-span-12 flex items-end justify-end">
          <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2">Upload & Add</button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{success}</div>}

      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Drive Link</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">No gallery events</td></tr>
            ) : items.map((it) => {
              const isEdit = editingId === it.id;
              return (
                <tr key={it.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    {isEdit ? (
                      <select
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft._titleId ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, _titleId: e.target.value ? Number(e.target.value) : "" }))}
                      >
                        <option value="">Select from Event Names…</option>
                        {names.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
                      </select>
                    ) : it.title}
                  </td>

                  <td className="px-4 py-3 align-top">
                    {isEdit ? (
                      <input
                        type="date"
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft._date ?? it.date}
                        onChange={(e) => setDraft((d) => ({ ...d, _date: e.target.value }))}
                      />
                    ) : (
                      <>
                        <div className="font-mono">{it.date}</div>
                        <div className="text-xs text-gray-500">{formatEventDatePrettyEV(it.date)}</div>
                      </>
                    )}
                  </td>

                  <td className="px-4 py-3 align-top">
                    {isEdit ? (
                      <input
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft.drivelink ?? it.drivelink}
                        onChange={(e) => setDraft((d) => ({ ...d, drivelink: e.target.value }))}
                      />
                    ) : (
                      <a className="text-blue-600 underline break-all" href={it.drivelink} target="_blank" rel="noreferrer">
                        {it.drivelink}
                      </a>
                    )}
                  </td>

                  <td className="px-4 py-3 align-top text-right space-x-2">
                    {isEdit ? (
                      <>
                        <button onClick={() => saveEdit(it.id)} className="rounded-lg bg-blue-600 text-white px-3 py-1">Save</button>
                        <button onClick={() => (setEditingId(null), setDraft({}))} className="rounded-lg border px-3 py-1">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => (setEditingId(it.id), setDraft({}))} className="rounded-lg border px-3 py-1">Edit</button>
                        <button onClick={() => removeItem(it.id)} className="rounded-lg bg-red-600 text-white px-3 py-1">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
function GalleryImagesPanel_Linked() {
  const [items, setItems] = React.useState<GalleryImageRow[]>([]);
  const [events, setEvents] = React.useState<GalleryEventRow[]>([]);
  const [eventId, setEventId] = React.useState<number | "">("");
  const [file, setFile] = React.useState<File | null>(null);

  const [, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Partial<GalleryImageRow> & { _eventId?: number | "" }>({});

  React.useEffect(() => {
  (async () => {
    await fetchEvents();
    await fetchItems();
  })();
}, []);

  async function fetchEvents() {
    try {
      const res = await fetch(`${API_BASE}/galleryevents`);
      const data: GalleryEventRow[] = Array.isArray(await res.json()) ? await res.json() : (await res.json())?.data || [];
      setEvents(data);
    } catch {  }
  }
  async function fetchItems() {
    try {
      setLoading(true); setError(null);
      const res = await fetch(`${API_BASE}/galleryimages`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      const list: GalleryImageRow[] =
  (Array.isArray(data) ? data : data?.data || []).map((x: any) => ({
    ...x,
    _eventTitle: events.find((e) => e.id === x.galleryEventId)?.title
  }));
setItems(list);
    } catch (e: any) {
      setError(e?.message || "Failed to load gallery images");
    } finally { setLoading(false); }
  }

  async function createItem(e: React.FormEvent) {
    e.preventDefault(); setError(null); setSuccess(null);
    if (!eventId) return setError("Select a gallery event first");
    if (!file) return setError("Choose an image to upload");
    try {
      const url = await uploadImage(file);
      const payload = { image: url, galleryEventId: Number(eventId) };
      const res = await fetch(`${API_BASE}/galleryimages`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setEventId(""); setFile(null);
      (document.getElementById("gi-file-input") as HTMLInputElement | null)?.value && ((document.getElementById("gi-file-input") as HTMLInputElement).value = "");
      setSuccess("Gallery image added");
    } catch (e: any) {
      setError(e?.message || "Failed to add gallery image");
    }
  }

  async function saveEdit(id: number) {
    setError(null); setSuccess(null);
    try {
      const patch: any = { ...draft };
      if ("_eventId" in patch) {
        patch.galleryEventId = patch._eventId ? Number(patch._eventId) : null;
        delete patch._eventId;
      }
      const res = await fetch(`${API_BASE}/galleryimages/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch)
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      setItems((prev) => prev.map((x) => (x.id === id ? ({ ...x, ...patch }) as GalleryImageRow : x)));
      setEditingId(null); setDraft({});
      setSuccess("Gallery image updated");
    } catch (e: any) {
      setError(e?.message || "Failed to update gallery image");
    }
  }

  async function removeItem(id: number) {
    if (!confirm("Delete this image?")) return;
    setError(null); setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/galleryimages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setItems((prev) => prev.filter((x) => x.id !== id));
      setSuccess("Gallery image deleted");
    } catch (e: any) {
      setError(e?.message || "Failed to delete gallery image");
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>

      <form onSubmit={createItem} className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4 bg-white border border-gray-200 p-4 rounded-2xl">
        <div className="md:col-span-3">
          <FieldLabel>Gallery Event *</FieldLabel>
          <select value={eventId} onChange={(e) => setEventId(e.target.value ? Number(e.target.value) : "")} className="mt-1 w-full rounded-xl border px-3 py-2" required>
            <option value="">Select an existing gallery event…</option>
            {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title} — {ev.date}</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Only existing gallery events can be selected.</p>
        </div>
        <div className="md:col-span-3">
          <FieldLabel>Image *</FieldLabel>
          <input id="gi-file-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-xl border px-3 py-2" required />
        </div>
        <div className="md:col-span-6 flex items-end justify-end">
          <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2">Upload & Add</button>
        </div>
      </form>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-700 p-3">{success}</div>}

      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image URL</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-500">No gallery images</td></tr>
            ) : items.map((it) => {
              const isEdit = editingId === it.id;
              const current = events.find((e) => e.id === it.galleryEventId);
              return (
                <tr key={it.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-28 h-16 overflow-hidden rounded-lg bg-gray-100">
                      <img src={it.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top break-all">{it.image}</td>
                  <td className="px-4 py-3 align-top">
                    {isEdit ? (
                      <select
                        className="w-full rounded-lg border px-2 py-1"
                        value={draft._eventId ?? it.galleryEventId}
                        onChange={(e) => setDraft((d) => ({ ...d, _eventId: Number(e.target.value) }))}
                      >
                        {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title} — {ev.date}</option>)}
                      </select>
                    ) : (
                      current ? `${current.title} — ${current.date}` : `#${it.galleryEventId}`
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-right space-x-2">
                    {isEdit ? (
                      <>
                        <button onClick={() => saveEdit(it.id)} className="rounded-lg bg-blue-600 text-white px-3 py-1">Save</button>
                        <button onClick={() => (setEditingId(null), setDraft({}))} className="rounded-lg border px-3 py-1">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => (setEditingId(it.id), setDraft({}))} className="rounded-lg border px-3 py-1">Edit</button>
                        <button onClick={() => removeItem(it.id)} className="rounded-lg bg-red-600 text-white px-3 py-1">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
