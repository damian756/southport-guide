// The claim submission's schema (app/api/hub/claim/submit). Messages for a
// refused field are in lib/claim-form.ts; the limits here (100 and 2,000)
// match its MAX_NAME and MAX_MESSAGE, which tests/claim-form.test.mjs checks.
// Only zod is imported, so the test can load this file directly.
import { z } from "zod";

export const ClaimSchema = z.object({
  businessId: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().max(2000).optional(),
});
