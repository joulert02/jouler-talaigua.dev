const LABELS = { approved: "Approved", draft: "Draft", pending: "Pending owner" };

/** @param {{ status: "approved" | "draft" | "pending" }} props */
export function StatusBadge({ status }) {
  return <span className={`sb-status sb-status--${status}`}>{LABELS[status]}</span>;
}
