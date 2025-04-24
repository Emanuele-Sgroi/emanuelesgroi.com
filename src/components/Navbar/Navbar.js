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

const Navbar = async ({ lang }) => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);

  const { data: portfolioContent, error: portfolioError } =
    await fetchPortfolioContent(lang);

  const { data: writingsContent, error: writingsError } =
    await fetchWritingsContent(lang);

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
