import {
  fetchDiscussionContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import DiscussionsPage from "@/pages/DiscussionsPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => {
  const lang = getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/discussions", lang),
  };
};

const Discussions = async () => {
  const lang = getCurrentLanguageServer();

  // Fetch data From CMS
  const { data: discussionContent, error: discussionError } =
    await fetchDiscussionContent(lang);
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);

  const hasError = discussionError || generalInfoError;

  return (
    <DiscussionsPage
      discussionContent={discussionContent}
      generalInfoContent={generalInfoContent}
      error={hasError}
    />
  );
};

export default Discussions;
