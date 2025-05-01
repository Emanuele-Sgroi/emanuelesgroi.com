import {
  fetchWelcomeContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import WelcomePage from "@/pages/WelcomePage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => {
  const lang = getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/", lang),
  };
};

const Welcome = async () => {
  const lang = getCurrentLanguageServer();

  // Fetch Data from CMS
  const { data: welcomeContent, error: welcomeError } =
    await fetchWelcomeContent(lang);
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);

  const hasError = welcomeError || generalInfoError;

  return (
    <WelcomePage
      welcomeContent={welcomeContent}
      generalInfoContent={generalInfoContent}
      error={hasError}
    />
  );
};

export default Welcome;
