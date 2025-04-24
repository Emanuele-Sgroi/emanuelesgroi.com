import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import DevQuizPage from "@/pages/DevQuizPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/dev-quiz"],
});

const DevQuiz = async () => {
  const lang = getCurrentLanguageServer();

  //Fetch data from CMS
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);
  const hasError = generalInfoError;

  return (
    <DevQuizPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default DevQuiz;
