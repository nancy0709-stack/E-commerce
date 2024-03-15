import React , {Fragment} from "react";
import ResourceNotFound from "../common/ui/errorComponent/Error";

const ErrorPage: React.FC = () => {
  return (
    <Fragment>
      <ResourceNotFound />
    </Fragment>
  );
};

export default ErrorPage;
