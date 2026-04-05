"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  X,
} from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  rawContent: string | null;
  category: string;
  source: string;
  sourceUrl: string | null;
  imageUrl: string | null;
  status: string;
  featured: boolean;
  slug: string | null;
  publishedAt: string | null;
  createdAt: string;
};

const SOURCE_LABELS: Record<string, string> = {
  "merseyside-police": "Merseyside Police",
  "sefton-council": "Sefton Council",
  "environment-agency": "Environment Agency",
  "southport-fc": "Southport FC",
  sufs: "Stand Up For Southport",
  visiter: "Southport Visiter",
  "user-submitted": "Community",
};

const STATUS_STYLES: Record<string, string> = {
  auto_published: "bg-green-100 text-green-700",
  published: "bg-green-100 text-green-700",
  pending_review: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type Action = "publish" | "reject" | "feature" | "delete";

function NewsRow({
  item,
  showActions,
  onAction,
}: {
  item: NewsItem;
  showActions: boolean;
  onAction?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState<Action | null>(null);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function clearCustomImage() {
    setCustomImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleAction(action: Action) {
    setLoading(action);
    try {
      let customImageUrl: string | undefined;

      // Upload custom image before feature/publish if one was selected
      if (customImage && (action === "feature" || action === "publish")) {
        const fd = new FormData();
        fd.append("file", customImage);
        const uploadRes = await fetch("/api/admin/news/upload-image", { method: "POST", body: fd });
        const uploadData = (await uploadRes.json()) as { url?: string };
        customImageUrl = uploadData.url;
      }

      await fetch("/api/admin/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action, customImageUrl }),
      });
      onAction?.(item.id);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={`border rounded-lg bg-white overflow-hidden ${item.featured ? "border-[#C9A84C]" : "border-gray-100"}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[item.status] ?? "bg-gray-100 text-gray-600"}`}>
                {item.status.replace("_", " ")}
              </span>
              {item.featured && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#C9A84C]/20 text-[#C9A84C] flex items-center gap-1">
                  <Star className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
              <span className="text-xs text-gray-400">{SOURCE_LABELS[item.source] ?? item.source}</span>
              <span className="text-xs text-gray-300">{item.category}</span>
              <span className="text-xs text-gray-300">{formatDate(item.createdAt)}</span>
            </div>
            <p className="font-semibold text-[#1B2E4B] text-sm leading-snug">{item.title}</p>
            <p className="text-gray-600 text-xs mt-1 line-clamp-2">{item.summary}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {showActions && (
            <>
              <button
                onClick={() => handleAction("publish")}
                disabled={loading !== null}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {loading === "publish" ? "Rewriting..." : "Approve & Publish"}
              </button>
              <button
                onClick={() => handleAction("feature")}
                disabled={loading !== null}
                title="Fetch full article + write 500-word featured piece. Goes in the hero slot on /news."
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C] text-white text-xs font-medium rounded-lg hover:bg-[#b8963d] disabled:opacity-50"
              >
                <Star className="w-3.5 h-3.5" />
                {loading === "feature" ? "Writing feature..." : "Feature"}
              </button>

              {/* Custom image upload — replaces Unsplash on publish/feature */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              {previewUrl ? (
                <div className="relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Custom image preview" className="w-8 h-8 rounded object-cover border border-[#C9A84C]" />
                  <button
                    onClick={clearCustomImage}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
                    title="Remove custom image"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload a custom image (replaces Unsplash)"
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 text-gray-500 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:text-[#1B2E4B]"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  Image
                </button>
              )}

              <button
                onClick={() => handleAction("reject")}
                disabled={loading !== null}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 disabled:opacity-50"
              >
                <XCircle className="w-3.5 h-3.5" />
                {loading === "reject" ? "Rejecting..." : "Reject"}
              </button>
            </>
          )}

          {/* Live article link for approved items */}
          {!showActions && item.slug && (
            <a
              href={`/news/${item.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#1B2E4B] hover:text-[#C9A84C]"
            >
              <ExternalLink className="w-3 h-3" />
              View live
            </a>
          )}

          {/* Delete button — shown on approved tab */}
          {!showActions && (
            <button
              onClick={() => handleAction("delete")}
              disabled={loading !== null}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 disabled:opacity-50 ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {loading === "delete" ? "Deleting..." : "Delete"}
            </button>
          )}

          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1B2E4B]"
            >
              <ExternalLink className="w-3 h-3" />
              Source
            </a>
          )}
          {item.rawContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1B2E4B] ml-auto"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? "Hide" : "Original"}
            </button>
          )}
        </div>

        {expanded && item.rawContent && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 leading-relaxed max-h-48 overflow-y-auto">
            {item.rawContent}
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  view,
}: {
  page: number;
  totalPages: number;
  view: string;
}) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  function goTo(p: number) {
    router.push(`/admin/news?view=${view}&page=${p}`);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Previous
      </button>
      <span className="text-xs text-gray-500">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function NewsReviewClient({
  items,
  view,
  page,
  totalPages,
  totalCount,
  pendingCount,
}: {
  items: NewsItem[];
  view: "pending" | "approved";
  page: number;
  totalPages: number;
  totalCount: number;
  pendingCount: number;
}) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(items);
  const [purging, setPurging] = useState(false);
  const [purgingAll, setPurgingAll] = useState(false);
  const [purgeResult, setPurgeResult] = useState<string | null>(null);

  function handleItemActioned(id: string) {
    setVisibleItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handlePurge() {
    if (!confirm(`Delete all ${pendingCount} pending items? This cannot be undone.`)) return;
    setPurging(true);
    setPurgeResult(null);
    try {
      const res = await fetch("/api/admin/news/purge-pending", { method: "DELETE" });
      const data = (await res.json()) as { deleted?: number };
      setPurgeResult(`Deleted ${data.deleted ?? 0} pending items.`);
      setVisibleItems([]);
    } finally {
      setPurging(false);
    }
  }

  async function handlePurgeAll() {
    if (!confirm("Delete EVERY news item (pending AND approved)? This wipes the entire news database. Cannot be undone.")) return;
    setPurgingAll(true);
    setPurgeResult(null);
    try {
      const res = await fetch("/api/admin/news/purge-all", { method: "DELETE" });
      const data = (await res.json()) as { deleted?: number };
      setPurgeResult(`Wiped ${data.deleted ?? 0} items total.`);
      setVisibleItems([]);
    } finally {
      setPurgingAll(false);
    }
  }

  function switchView(v: "pending" | "approved") {
    router.push(`/admin/news?view=${v}&page=1`);
  }

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => switchView("pending")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              view === "pending"
                ? "bg-white text-[#1B2E4B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                {pendingCount > 99 ? "99+" : pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => switchView("approved")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              view === "approved"
                ? "bg-white text-[#1B2E4B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Approved
          </button>
        </div>

        {/* Purge buttons */}
        <div className="flex items-center gap-2">
          {view === "pending" && pendingCount > 0 && (
            <button
              onClick={handlePurge}
              disabled={purging || purgingAll}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {purging ? "Purging..." : `Purge ${pendingCount} pending`}
            </button>
          )}
          <button
            onClick={handlePurgeAll}
            disabled={purging || purgingAll}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {purgingAll ? "Wiping..." : "Wipe ALL news"}
          </button>
        </div>
      </div>

      {purgeResult && (
        <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {purgeResult}
        </p>
      )}

      {/* Count */}
      <p className="text-xs text-gray-400">
        {totalCount} item{totalCount !== 1 ? "s" : ""}{totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
      </p>

      {/* List */}
      {visibleItems.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
          {view === "pending" ? "Nothing waiting for review." : "No approved articles yet."}
        </div>
      ) : (
        <div className="space-y-2">
          {visibleItems.map((item) => (
            <NewsRow
              key={item.id}
              item={item}
              showActions={view === "pending"}
              onAction={view === "pending" ? handleItemActioned : undefined}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} view={view} />
    </div>
  );
}
