import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import DevQuizPage from "@/pages/DevQuizPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = async () => {
  const lang = await getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/dev-quiz", lang),
  };
};

const DevQuiz = async () => {
  const lang = await getCurrentLanguageServer();

  //Fetch data from CMS
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent(lang);
  const hasError = generalInfoError;

  return (
    <DevQuizPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default DevQuiz;
