import { Filter } from "bad-words";

const blocker = new Filter();

export function cleanMessage(input: string) {
  return blocker.clean(input);
}
