import { fetchWritingsContent } from "@/utils/fetchCMSContent";
import WritingsPage from "@/pages/WritingsPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/writings"],
});

const Writings = async () => {
  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent();

  const hasError = writingsError;

  return <WritingsPage writingsContent={writingsContent} error={hasError} />;
};

export default Writings;
