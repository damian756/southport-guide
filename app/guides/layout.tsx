// Guide pages are built ahead of time. Rebuilding them daily lets the
// date-driven parts (an event guide's "this has passed" notice, the "what's on
// now" cards) change on the day, not on the next deploy.
export const revalidate = 86400;

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
