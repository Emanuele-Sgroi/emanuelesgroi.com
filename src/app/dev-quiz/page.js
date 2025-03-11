import { fetchGeneralInfoContent } from "@/utils/fetchCMSContent";
import DevQuizPage from "@/pages/DevQuizPage";

const DevQuiz = async () => {
  const { data: generalInfoContent, error: generalInfoError } =
    await fetchGeneralInfoContent();
  const hasError = generalInfoError;
  return (
    <DevQuizPage generalInfoContent={generalInfoContent} error={hasError} />
  );
};

export default DevQuiz;
