import { fetchManuPilotContent } from "@/utils/fetchCMSContent";
import ManuPilotPage from "@/pages/ManuPilotPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/manupilot"],
});

const ManuPilot = async () => {
  const { data: manuPilotContent, error: manuPilotError } =
    await fetchManuPilotContent();

  const hasError = manuPilotError;

  return (
    <ManuPilotPage manuPilotContent={manuPilotContent} isError={hasError} />
  );
};

export default ManuPilot;
