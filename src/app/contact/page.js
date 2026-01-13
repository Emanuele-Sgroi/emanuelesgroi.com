import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import ContactPage from "@/pages/ContactPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = async () => {
  const lang = await getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/contact", lang),
  };
};

const Contact = async () => {
  const lang = await getCurrentLanguageServer();

  // Fetc data from CMS
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);
  const hasError = generalInfoError;

  return (
    <ContactPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default Contact;
