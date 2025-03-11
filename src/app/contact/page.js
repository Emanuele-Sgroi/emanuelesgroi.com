import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import ContactPage from "@/pages/ContactPage";

const Contact = async () => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();
  const hasError = generalInfoError;
  return (
    <ContactPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default Contact;
