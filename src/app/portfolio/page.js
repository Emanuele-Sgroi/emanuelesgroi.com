import {
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import PortfolioPage from "@/pages/PortfolioPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/portfolio"],
});

const Portfolio = async () => {
  const lang = getCurrentLanguageServer();

  // Fetch data from CMS
  const { data: portfolioContent, error: portfolioError } =
    await fetchPortfolioContent(lang);
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);

  const hasError = portfolioError || generalInfoError;

  return (
    <PortfolioPage
      portfolioContent={portfolioContent}
      generalInfoContent={generalInfoContent}
      error={hasError}
    />
  );
};

export default Portfolio;
