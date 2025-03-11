import { fetchWritingsContent } from "@/utils/fetchCMSContent";
import WritingsPage from "@/pages/WritingsPage";

const Writings = async () => {
  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent();

  const hasError = writingsError;

  return <WritingsPage writingsContent={writingsContent} error={hasError} />;
};

export default Writings;
