import FlathubImage from "../src/components/Image"
import CodeCopy from "../src/components/application/CodeCopy"
import { NextSeo } from "next-seo"
import cc0 from "/public/img/CC0.png"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Trans, useTranslation } from "next-i18next"
import { getLanguageName, languages } from "src/localize"
import { useState } from "react"
import Image from "next/image"

const Badges = () => {
  const { t } = useTranslation()

  const [locale, setLocale] = useState("en")

  const badgeExampleCode = `<a href='https://flathub.org/apps/org.gimp.GIMP'>
    <img width='240' alt='Download on Flathub' src='${process.env.NEXT_PUBLIC_SITE_BASE_URI}/api/badge?locale=${locale}'/>
  </a>`
  const badgeExampleCodeMoinMoin = `[[https://flathub.org/apps/org.gimp.GIMP|{{${process.env.NEXT_PUBLIC_SITE_BASE_URI}/api/badge?locale=${locale}|Download on Flathub|width=240,align=middle}}]]`

  return (
    <>
      <NextSeo
        title={t("official-badges")}
        description={t("badges-description")}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_SITE_BASE_URI}/badges`,
        }}
      />
      <section className="max-w-11/12 mx-auto my-0 mt-12 w-11/12 space-y-4 2xl:w-[1400px] 2xl:max-w-[1400px]">
        <h1 className="mb-8 text-4xl font-extrabold">{t("official-badges")}</h1>
        <p>{t("badges-block")}</p>

        <div className="flex flex-col w-full sm:flex-row sm:items-center gap-x-6 gap-y-4">
          <div className="w-48 font-semibold">{t("switch-language")}</div>
          <select
            className="p-2 rounded-sm w-full sm:max-w-[240px]"
            onChange={(e) => setLocale(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {getLanguageName(language)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-wrap justify-around">
          <div>
            <h3 className="my-4 text-xl font-semibold">
              {t("preferred-badge")}
            </h3>
            <Image
              width="240"
              height="80"
              alt="Download on Flathub"
              src={`/api/badge?locale=${locale}`}
            />
            <h6 className="pt-2 text-xs font-normal">
              <Trans i18nKey={"common:also-available-as-svg"}>
                Also available in{" "}
                <a
                  className="no-underline hover:underline"
                  href={`/api/badge?svg&locale=${locale}`}
                >
                  svg format
                </a>
              </Trans>
            </h6>
          </div>

          <div>
            <h3 className="my-4 text-xl font-semibold">
              {t("alternative-badge")}
            </h3>
            <Image
              width="240"
              height="80"
              alt="Download on Flathub"
              src={`/api/badge?light&locale=${locale}`}
            />
            <h6 className="pt-2 text-xs font-normal">
              <Trans i18nKey={"common:also-available-as-svg"}>
                Also available in{" "}
                <a
                  className="no-underline hover:underline"
                  href={`/api/badge?light&svg&locale=${locale}`}
                >
                  svg format
                </a>
              </Trans>
            </h6>
          </div>
        </div>

        <p
          // this is a workaround for react not supporting it: https://github.com/facebook/react/issues/16563
          {...{
            "xmlns.dct": "http://purl.org/dc/terms/",
            "xmlns.vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
          }}
        >
          <a
            rel="license"
            href="http://creativecommons.org/publicdomain/zero/1.0/"
          >
            <FlathubImage src={cc0} alt="CC0" />
          </a>
          <br />
          <Trans i18nKey={"common:badge-copyright"}>
            To the extent possible under law,{" "}
            <a
              rel="dct:publisher"
              className="no-underline hover:underline"
              href="https://flathub.org/badges"
            >
              <span property="dct:title">Jakub Steiner</span>
            </a>{" "}
            has waived all copyright and related or neighboring rights to
            <span property="dct:title">Flathub Badges</span>. This work is
            published from: Czech Republic.
          </Trans>
        </p>

        <h2 className="mb-6 mt-12 text-2xl font-bold">{t("code-examples")}</h2>

        <div className="flex w-full flex-wrap justify-around">
          <div>
            <h3 className="my-4 text-xl font-semibold">HTML</h3>
            <CodeCopy
              className="min-h-[180px] max-w-xs"
              text={badgeExampleCode}
            ></CodeCopy>
            <a href="https://flathub.org/apps/org.gimp.GIMP">
              <Image
                width={240}
                height={80}
                alt="Download on Flathub"
                src={`/api/badge?locale=${locale}`}
              />
            </a>
          </div>
          <div>
            <h3 className="my-4 text-xl font-semibold">MoinMoin Wiki</h3>
            <CodeCopy
              className="min-h-[180px] max-w-xs"
              text={badgeExampleCodeMoinMoin}
            ></CodeCopy>
            <a href="https://flathub.org/apps/org.gimp.GIMP">
              <Image
                width={240}
                height={80}
                alt="Download on Flathub"
                src={`/api/badge?locale=${locale}`}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 900,
  }
}

export default Badges
