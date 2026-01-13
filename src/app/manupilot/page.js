import { fetchManuPilotContent } from "@/utils/fetchCMSContent";
import ManuPilotPage from "@/pages/ManuPilotPage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = async () => {
  const lang = await getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/manupilot", lang),
  };
};

const ManuPilot = async () => {
  const lang = await getCurrentLanguageServer();

  //fetch data from CMS
  const { data: manuPilotContent, error: manuPilotError } =
    await fetchManuPilotContent(lang);

  const hasError = manuPilotError;

  return (
    <ManuPilotPage manuPilotContent={manuPilotContent} isError={hasError} />
  );
};

export default ManuPilot;
