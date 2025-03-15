import {
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import PortfolioPage from "@/pages/PortfolioPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/portfolio"],
});

const Portfolio = async () => {
  // Fetch data from CMS
  const { data: portfolioContent, error: portfolioError } =
    await fetchPortfolioContent();
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();

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
