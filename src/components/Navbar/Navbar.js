import {
  fetchWelcomeContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();

  const hasError = generalInfoError;
  return (
    <NavbarClient generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default Navbar;
