import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/fontawesome-free/brands";

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: size }} />;
}
