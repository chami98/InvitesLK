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

type RouterProps = TemplateProps & { templateId: number };

/** Static switch so template components are not resolved dynamically during render (ESLint). */
export function TemplateRouter({ templateId, ...props }: RouterProps) {
  switch (templateId) {
    case 1:
      return <Template1 {...props} />;
    case 2:
      return <Template2 {...props} />;
    case 3:
      return <Template3 {...props} />;
    case 4:
      return <Template4 {...props} />;
    case 5:
      return <Template5 {...props} />;
    case 6:
      return <Template6 {...props} />;
    case 7:
      return <Template7 {...props} />;
    case 8:
      return <Template8 {...props} />;
    case 9:
      return <Template9 {...props} />;
    case 10:
      return <Template10 {...props} />;
    default:
      return <Template1 {...props} />;
  }
}
