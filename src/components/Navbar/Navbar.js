import {
  fetchWritingsContent,
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();

  const { data: portfolioContent, error: portfolioError } =
    await fetchPortfolioContent();

  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent();

  const hasError = generalInfoError || portfolioError || writingsError;

  return (
    <NavbarClient
      generalInfoContent={generalInfoContent}
      portfolioContent={portfolioContent}
      writingsContent={writingsContent}
      error={hasError}
    />
  );
};

export default Navbar;
