import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

export const ErrorPage = () => {
  const error = useRouteError();

  console.log(error);

  let title = "An error occured";
  let message = "Somthing went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    {
      title = "Not found";
      message = "Could not find resource of the page.";
    }
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};
