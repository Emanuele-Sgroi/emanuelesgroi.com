import {
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import PortfolioPage from "@/pages/PortfolioPage";

const Portfolio = async () => {
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
