"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

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

function NewsRow({
  item,
  showActions,
  onAction,
}: {
  item: NewsItem;
  showActions: boolean;
  onAction?: (id: string, action: "publish" | "reject") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState<"publish" | "reject" | null>(null);

  async function handleAction(action: "publish" | "reject") {
    setLoading(action);
    try {
      await fetch("/api/admin/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action }),
      });
      onAction?.(item.id, action);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="border border-gray-100 rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[item.status] ?? "bg-gray-100 text-gray-600"}`}>
                {item.status.replace("_", " ")}
              </span>
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
                {loading === "publish" ? "Rewriting with Claude..." : "Approve & Publish"}
              </button>
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

export default function NewsReviewClient({
  pending,
  recent,
}: {
  pending: NewsItem[];
  recent: NewsItem[];
}) {
  const [pendingItems, setPendingItems] = useState(pending);

  function handleAction(id: string) {
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-8">
      {/* Pending review */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Pending Review ({pendingItems.length})
        </h2>
        {pendingItems.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
            Nothing waiting for review. Good.
          </div>
        ) : (
          <div className="space-y-2">
            {pendingItems.map((item) => (
              <NewsRow
                key={item.id}
                item={item}
                showActions
                onAction={(id) => handleAction(id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent auto-published */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Recent (last 20)
        </h2>
        <div className="space-y-2">
          {recent.map((item) => (
            <NewsRow key={item.id} item={item} showActions={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
