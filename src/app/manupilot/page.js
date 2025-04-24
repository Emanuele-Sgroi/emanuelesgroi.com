import { fetchManuPilotContent } from "@/utils/fetchCMSContent";
import ManuPilotPage from "@/pages/ManuPilotPage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/manupilot"],
});

const ManuPilot = async () => {
  const lang = getCurrentLanguageServer();

  //fetch data from CMS
  const { data: manuPilotContent, error: manuPilotError } =
    await fetchManuPilotContent(lang);

  const hasError = manuPilotError;

  return (
    <ManuPilotPage manuPilotContent={manuPilotContent} isError={hasError} />
  );
};

export default ManuPilot;
