import type { ComponentType } from "react";
import type { TemplateProps } from "./types";
import { Template1 } from "./Template1";
import { Template10 } from "./Template10";
import { Template2 } from "./Template2";
import { Template3 } from "./Template3";
import { Template4 } from "./Template4";
import { Template5 } from "./Template5";
import { Template6 } from "./Template6";
import { Template7 } from "./Template7";
import { Template8 } from "./Template8";
import { Template9 } from "./Template9";

export const TEMPLATE_COMPONENTS: Record<number, ComponentType<TemplateProps>> = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
  6: Template6,
  7: Template7,
  8: Template8,
  9: Template9,
  10: Template10,
};

export function getTemplateComponent(templateId: number): ComponentType<TemplateProps> {
  return TEMPLATE_COMPONENTS[templateId] ?? Template1;
}
