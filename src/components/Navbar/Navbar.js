import {
  fetchWritingsContent,
  fetchPortfolioContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import NavbarClient from "./NavbarClient";

/**
 * Navbar Component
 *
 * Fetches CMS content and passes it to NavbarClient.
 * - Retrieves general info, portfolio, and writings content from the CMS.
 * - Handles potential errors and passes them to the client-side navbar.
 *
 * Uses:
 * - NavbarClient: The client-side navigation component.
 *
 * Asynchronous Component.
 */

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
