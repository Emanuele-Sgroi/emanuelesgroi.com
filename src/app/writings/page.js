import { fetchWritingsContent } from "@/utils/fetchCMSContent";
import WritingsPage from "@/pages/WritingsPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = async () => {
  const lang = await getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/writings", lang),
  };
};

const Writings = async () => {
  const lang = await getCurrentLanguageServer();

  // Fetch data from CMS
  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent(lang);

  const hasError = writingsError;

  return <WritingsPage writingsContent={writingsContent} error={hasError} />;
};

export default Writings;
