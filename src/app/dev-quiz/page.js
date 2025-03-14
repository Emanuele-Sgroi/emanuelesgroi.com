import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import DevQuizPage from "@/pages/DevQuizPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/dev-quiz"],
});

const DevQuiz = async () => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();
  const hasError = generalInfoError;
  return (
    <DevQuizPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default DevQuiz;
