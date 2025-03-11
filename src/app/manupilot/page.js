import { fetchManuPilotContent } from "@/utils/fetchCMSContent";
import ManuPilotPage from "@/pages/ManuPilotPage";

const ManuPilot = async () => {
  const { data: manuPilotContent, error: manuPilotError } =
    await fetchManuPilotContent();

  const hasError = manuPilotError;

  return (
    <ManuPilotPage manuPilotContent={manuPilotContent} isError={hasError} />
  );
};

export default ManuPilot;
