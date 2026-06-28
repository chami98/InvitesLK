import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: size }} />;
}
