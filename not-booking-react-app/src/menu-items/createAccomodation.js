import { IconHomePlus } from "@tabler/icons";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const createAccomodation = {
  id: "createAccomodation",
  title: "Create accomodation",
  type: "group",
  children: [
    {
      id: "default",
      title: "Create Accomodation",
      type: "item",
      url: "/main/host/createAccomodation",
      icon: IconHomePlus,
      breadcrumbs: false,
    },
  ],
};

export default createAccomodation;
