/**
 * The CENTURY 21 Luxe Marbella team, transcribed from marbellaluxe.es/the-team/.
 * Names, roles and languages are the client's. No portraits are published on the
 * live site, so the redesign renders monogram plates instead of placeholder faces.
 */

export type Member = {
  name: string;
  role: string;
  languages: string[];
  /** Personal C21 subdomain as printed on the live site, where one exists. */
  profile?: string;
  lead?: boolean;
};

export const leadership: Member[] = [
  { name: "Levi Boterdael", role: "General Director · Broker", languages: [], lead: true },
  { name: "Olha Krasnova", role: "CEO · Broker", languages: [], lead: true },
];

export const consultants: Member[] = [
  {
    name: "Natalia Khalezina",
    role: "Sales Consultant",
    languages: ["English", "Russian", "Spanish"],
    profile: "natalia-khalezina.century21.es",
  },
  {
    name: "Souad Ouldam",
    role: "Sales Consultant",
    languages: ["English", "French", "Spanish"],
    profile: "souad-ouldam.century21.es",
  },
  {
    name: "Jana Ille",
    role: "Sales Consultant",
    languages: ["English", "Russian", "Spanish"],
    profile: "jana-ille.century21.es",
  },
  {
    name: "Philippe Van Heymbeeck",
    role: "Sales Consultant",
    languages: ["English", "Dutch"],
    profile: "philippe.century21.es",
  },
  {
    name: "Gabriel Pays",
    role: "Sales Consultant",
    languages: ["French"],
    profile: "gabrielpays.century21.es",
  },
  {
    name: "Sam Long",
    role: "Sales Consultant",
    languages: ["English"],
    profile: "sam-long.century21.es",
  },
  {
    name: "Gregory Maroquin",
    role: "Sales Consultant",
    languages: ["English", "Spanish", "French"],
    profile: "gregory-maroquin.century21.es",
  },
  {
    name: "Simon De Cock",
    role: "Sales Consultant",
    languages: ["English", "Dutch", "French"],
  },
];

export const team = [...leadership, ...consultants];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}
