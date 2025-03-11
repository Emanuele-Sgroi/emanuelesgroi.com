import {
  fetchWelcomeContent,
  fetchGeneralInfoContent,
} from "@/utils/fetchCMSContent";
import WelcomePage from "@/pages/WelcomePage";

const Welcome = async () => {
  const { data: welcomeContent, error: welcomeError } =
    await fetchWelcomeContent();
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();

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
