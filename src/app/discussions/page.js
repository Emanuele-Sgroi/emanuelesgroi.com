import {
  fetchDiscussionContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import DiscussionsPage from "@/pages/DiscussionsPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/discussions"],
});

const Discussions = async () => {
  const { data: discussionContent, error: discussionError } =
    await fetchDiscussionContent();
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();

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
