// ── Contact addresses ─────────────────────────────────────────────────────────
// Two addresses, one place to change each. Checked by tests/enquiry-email.test.mjs.

// Where enquiries are delivered: the `to` of the contact form (including
// advertising enquiries), suggest-a-listing and the admin notice of a new
// claim. One inbox. Never printed on the site.
export const DELIVERY_EMAIL = "damian@churchtownmedia.co.uk";

// The only address of ours a visitor sees: mailto links, printed addresses,
// the footer, JSON-LD, privacy and terms, and email text that names a contact
// address. public/llms.txt prints it too (the test keeps the two in step).
export const DISPLAY_EMAIL = "hello@seftoncoast.network";

// The contact form's enquiry type for advertising. Links from the advertise
// page (/contact?topic=advertise&space=<id>) preselect it.
export const ADVERTISING_SUBJECT = "Advertise / Featured listing";
