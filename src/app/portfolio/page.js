import {
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import PortfolioPage from "@/pages/PortfolioPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => {
  const lang = getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/portfolio", lang),
  };
};

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
