import { fetchWritingsContent } from "@/utils/fetchCMSContent";
import WritingsPage from "@/pages/WritingsPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/writings"],
});

const Writings = async () => {
  const lang = getCurrentLanguageServer();

  // Fetch data from CMS
  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent(lang);

  const hasError = writingsError;

  return <WritingsPage writingsContent={writingsContent} error={hasError} />;
};

export default Writings;
