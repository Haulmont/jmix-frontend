import React from "react";
import { IntlProvider, useIntl } from "react-intl";
import { localesStore } from "./LocalesStore";
import TestRenderer from 'react-test-renderer';

let i18nKeyValue: string;
let i18nLocale: string;

const enDefaultMessage = "default message";
const ruDefaultMessage = "сообщение по умолчанию";

type I18nComponentProps = {
  locale: string,
  messages: Record<string, string>,
  id: string
}

type I18nChildComponentProps = {
  id: string
}

const I18nChildComponent: React.FC<I18nChildComponentProps> = ({ id }) => {
  const {locale, formatMessage} = useIntl();
  const defaultMessage = locale === "en" ? enDefaultMessage : ruDefaultMessage
  i18nLocale = locale;
  i18nKeyValue = formatMessage({ id, defaultMessage });
  return (
    <div>
      TestI18nComponent
    </div>
  )
}

const I18nComponent: React.FC<I18nComponentProps> = ({ locale, messages, id }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <I18nChildComponent id={id} />
    </IntlProvider>
  )
}


describe("i18n localesStore testing", () => {
  it("initial state of localesStore", () => {
    const initialLocalesCount = Object.keys(localesStore.messagesMapping).length;
    expect(initialLocalesCount).toEqual(0);
  });

  it("localesInfo with empty messagesMapping of localesStore", () => {
    const initialLocalesInfoCount = Object.keys(localesStore.localesInfo).length;
    expect(initialLocalesInfoCount).toEqual(0);
  });

  it("adding en locale to localesStore", () => {
    const enLocaleMessages = { "testedKey": "tested key value" };
    const enLocalInfo = {
      messages: enLocaleMessages,
      locale: "en",
      caption: "English"
    }
    localesStore.addLocale(enLocalInfo)
    const initialLocalesInfoCount = Object.keys(localesStore.localesInfo).length;
    expect(initialLocalesInfoCount).toEqual(1);
  });

  it("correct locale info of en", () => {
    const [{ locale, caption, isRtlLayout }] = localesStore.localesInfo;
    expect(locale).toEqual("en");
    expect(caption).toEqual("English");
    expect(isRtlLayout).toEqual(undefined);
  });

  it("adding another locale (ru) to localesStore", () => {
    const enLocaleMessages = { "testedKey": "тестовое значение" };
    const enLocalInfo = {
      messages: enLocaleMessages,
      locale: "ru",
      caption: "Русский"
    }
    localesStore.addLocale(enLocalInfo)
    const initialLocalesInfoCount = Object.keys(localesStore.localesInfo).length;
    expect(initialLocalesInfoCount).toEqual(2);
  });

  it("correct locale info of en", () => {
    const [, { locale, caption, isRtlLayout }] = localesStore.localesInfo;
    expect(locale).toEqual("ru");
    expect(caption).toEqual("Русский");
    expect(isRtlLayout).toEqual(undefined);
  });

  it("testing correct key mapping on en locale in react component", () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"testedKey"}
        />
      )
    });
    expect(i18nLocale).toEqual("en");
    expect(i18nKeyValue).toEqual("tested key value");
  });

  it("testing correct key mapping on ru locale in react component", () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nComponent
          locale={"ru"}
          messages={localesStore.messagesMapping["ru"]}
          id={"testedKey"}
        />
      )
    });
    expect(i18nLocale).toEqual("ru");
    expect(i18nKeyValue).toEqual("тестовое значение");
  })

  it("testing not existing key mapping on en locale in react component", () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"testtesttest"}
        />
      )
    });
    expect(i18nLocale).toEqual("en");
    expect(i18nKeyValue).toEqual(enDefaultMessage);
  })

  it("testing not existing key mapping on ru locale in react component", () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nComponent
          locale={"ru"}
          messages={localesStore.messagesMapping["ru"]}
          id={"testtesttest"}
        />
      )
    });
    expect(i18nLocale).toEqual("ru");
    expect(i18nKeyValue).toEqual(ruDefaultMessage);
  })
})
