import linguiConfig from "../../../lingui.config";
import { allMessages } from "../../appRouterI18n";
import LinguiClientProvider from "../../components/LinguiClientProvider";
import { initLingui, PageLangParam } from "../../initLingui";
import React from "react";
import { Trans } from "@lingui/react/macro";

// import { setI18n } from "@lingui/react/server";

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: PageLangParam) {
  // const i18n = getI18nInstance((await props.params).lang);

  return {
    title: <Trans>音频提取工具</Trans>,
  };
}

//@ts-expect-error: nothing
export default async function RootLayout({ children, params }) {
  const lang = (await params).lang;
  initLingui(lang);

  return (
    <html lang={lang}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col">
          <LinguiClientProvider
            initialLocale={lang}
            initialMessages={allMessages[lang]!}
          >
            {children}
          </LinguiClientProvider>
        </main>
      </body>
    </html>
  );
}
