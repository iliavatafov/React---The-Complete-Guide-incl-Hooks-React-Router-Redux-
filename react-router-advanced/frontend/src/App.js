import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { EditEventPage } from "./pages/EditEvent";
import { ErrorPage } from "./pages/Error";
import {
  EventDetailPage,
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import { EventsPage, loader as eventLoader } from "./pages/Events";
import { EventRootLayout } from "./pages/EventsRoot";
import { HomePage } from "./pages/Home";
import { NewEventPage } from "./pages/NewEvent";
import { RootLayout } from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
