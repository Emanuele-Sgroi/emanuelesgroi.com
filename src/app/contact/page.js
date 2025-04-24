import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import ContactPage from "@/pages/ContactPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/contact"],
});

const Contact = async () => {
  const lang = getCurrentLanguageServer();

  // Fetc data from CMS
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);
  const hasError = generalInfoError;

  return (
    <ContactPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default Contact;
