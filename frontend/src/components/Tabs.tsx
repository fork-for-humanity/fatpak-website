import { Tab } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import { FunctionComponent } from "react"
import { classNames } from "src/styling"

interface Props {
  tabs: { name: string; content: JSX.Element }[]
}

/** A link placed at the top of a page's main container to return to some other page */
const Tabs: FunctionComponent<Props> = ({ tabs }) => {
  return (
    <>
      <Tab.Group>
        <Tab.List className="flex gap-3 rounded-t-xl bg-flathub-gainsborow px-3 dark:bg-flathub-arsenic">
          {tabs.map((tab, index) => (
            <Tab key={index}>
              {({ selected }) => (
                <button
                  className={classNames(
                    selected
                      ? "border-flathub-celestial-blue text-flathub-dark-gunmetal dark:text-flathub-gainsborow"
                      : "border-transparent text-flathub-arsenic hover:border-flathub-gray-x11 hover:text-flathub-dark-gunmetal dark:text-flathub-gray-x11 dark:hover:text-flathub-gainsborow",
                    "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                  )}
                >
                  {tab.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel
              key={index}
              className="rounded-b-xl bg-flathub-gainsborow p-4 dark:bg-flathub-arsenic"
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default Tabs