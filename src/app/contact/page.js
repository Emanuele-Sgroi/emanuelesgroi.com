import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import ContactPage from "@/pages/ContactPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/contact"],
});

const Contact = async () => {
  // Fetc data from CMS
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();
  const hasError = generalInfoError;

  return (
    <ContactPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default Contact;
