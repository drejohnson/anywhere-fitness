import type { EventObject } from "xstate";
import type { User } from "./types";

export function assertEventType<TE extends EventObject, TType extends TE["type"]>(
  event: TE,
  eventType: TType
): asserts event is TE & { type: TType } {
  if (event.type !== eventType) {
    throw new Error(
      `Invalid event: expected "${eventType}", got "${event.type}"`
    );
  }
}

export const userMapper = (claims: Partial<User>) => ({
	id: claims.user_id,
	name: claims.name,
	email: claims.email,
	picture: claims.picture
});