import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getMetadataByPage } from "@/config/metadata";
import NotFoundClient from "@/components/NotFound/NotFoundClient";

export async function generateMetadata() {
  const lang = getCurrentLanguageServer();
  return getMetadataByPage("/not-found", lang);
}

export default function NotFoundPage() {
  return <NotFoundClient />;
}
