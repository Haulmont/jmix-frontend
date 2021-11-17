import React from "react";
import {IntlProvider, useIntl } from "react-intl";
import { localesStore } from "./LocalesStore";
import TestRenderer from 'react-test-renderer';
import dayjs from "dayjs";

let i18nKeyValue: any;
let i18nLocale: string;

let globalFormatNumber: any;

const enDefaultMessage = "default message";
const ruDefaultMessage = "сообщение по умолчанию";

const enLocaleMessages = { "testedKey": "tested key value" };
const enLocalInfo = {
  messages: enLocaleMessages,
  locale: "en",
  caption: "English"
}

const ruLocaleMessages = { "testedKey": "тестовое значение" };
const ruLocalInfo = {
  messages: ruLocaleMessages,
  locale: "ru",
  caption: "Русский"
}

const messagesWithParams = {
  "currentDate": "test currentDate {currentDate}",
  "currentTime": "test currentTime {currentTime}",
  "currentDateTime": "test currentDateTime {currentDateTime}",
  "firstYearDay": "test firstYearDay {firstYearDay}",
  "lastYearDay":  "test lastYearDay {lastYearDay}",
  "firstMonthDay": "test firstMonthDay {firstMonthDay}",
  "lastMonthDay":  "test lastMonthDay {lastMonthDay}",
  "firstWeekDay": "test firstWeekDay {firstWeekDay}",
  "lastWeekDay":  "test lastWeekDay {lastWeekDay}",
  "startPreviousDay": "test startPreviousDay {startPreviousDay}",
  "startNextDay": "test startNextDay {startNextDay}",
  "startCurrentHour": "test startCurrentHour {startCurrentHour}",
  "endCurrentHour": "test endCurrentHour {endCurrentHour}",
  "startCurrentMinute": "test startCurrentMinute {startCurrentMinute}",
  "endCurrentMinute": "test endCurrentMinute {endCurrentMinute}",
  "testedNumber": "test testedNumber {testedNumber}",
  "testedSomeValue": "test testedSomeValue {testedSomeValue}",
  "allTypesKey": "test date currentDateTime {currentDateTime} test number {testedNumber} test some value {testedSomeValue}"
};

const someValue = "some value";

type I18nComponentProps = {
  locale: string,
  messages: Record<string, string>,
  id: string
}

type I18nChildComponentProps = {
  id: string
}

type I18nParamsComponentProps = I18nComponentProps & {
  values: Record<string, any >,
}

type I18nParamsChildComponentProps = I18nChildComponentProps & {
  values: Record<string, any>,
}

const I18nChildComponent: React.FC<I18nChildComponentProps> = ({ id }) => {
  const {locale, formatMessage, formatNumber} = useIntl();
  globalFormatNumber = formatNumber;
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

const I18nParamsChildComponent: React.FC<I18nParamsChildComponentProps> = ({ id, values }) => {
  const {formatMessage} = useIntl();
  i18nKeyValue = formatMessage({ id }, values);
  return (
    <div>
      TestI18nComponent
    </div>
  )
}

const I18nParamsComponent: React.FC<I18nParamsComponentProps> = ({ locale, messages, id, values }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <I18nParamsChildComponent id={id} values={values}/>
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
    localesStore.addLocale(enLocalInfo);
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
    localesStore.addLocale(ruLocalInfo);
    const initialLocalesInfoCount = Object.keys(localesStore.localesInfo).length;
    expect(initialLocalesInfoCount).toEqual(2);
  });

  it("correct locale info of ru", () => {
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

describe("i18n parametrization", () => {
  beforeAll(() => {
    localesStore.addMessages("en", messagesWithParams);
  });

  it("currentDate param", () => {
    const currentDate = dayjs().format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"currentDate"}
          values={{currentDate}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test currentDate ${currentDate}`);
  });

  it("currentTime param", () => {
    const currentTime = dayjs().format("HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"currentTime"}
          values={{currentTime}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test currentTime ${currentTime}`);
  });

  it("currentDateTime param", () => {
    const currentDateTime = dayjs().format("YYYY-M-D HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"currentDateTime"}
          values={{currentDateTime}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test currentDateTime ${currentDateTime}`);
  });

  it("firstYearDay param", () => {
    const firstYearDay = dayjs().startOf("year").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"firstYearDay"}
          values={{firstYearDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test firstYearDay ${firstYearDay}`);
  });

  it("lastYearDay param", () => {
    const lastYearDay = dayjs().endOf("year").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"lastYearDay"}
          values={{lastYearDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test lastYearDay ${lastYearDay}`);
  });

  it("firstMonthDay param", () => {
    const firstMonthDay = dayjs().startOf("month").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"firstMonthDay"}
          values={{firstMonthDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test firstMonthDay ${firstMonthDay}`);
  });

  it("lastMonthDay param", () => {
    const lastMonthDay = dayjs().endOf("month").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"lastMonthDay"}
          values={{lastMonthDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test lastMonthDay ${lastMonthDay}`);
  });

  it("firstWeekDay param", () => {
    const firstWeekDay = dayjs().startOf("week").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"firstWeekDay"}
          values={{firstWeekDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test firstWeekDay ${firstWeekDay}`);
  });

  it("lastWeekDay param", () => {
    const lastWeekDay = dayjs().endOf("week").format("YYYY-M-D");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"lastWeekDay"}
          values={{lastWeekDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test lastWeekDay ${lastWeekDay}`);
  });

  it("startPreviousDay param", () => {
    const startPreviousDay = dayjs().subtract(1, "day").startOf("day").format("YYYY-M-D HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"startPreviousDay"}
          values={{startPreviousDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test startPreviousDay ${startPreviousDay}`);
  });

  it("startNextDay param", () => {
    const startNextDay = dayjs().add(1, "day").startOf("day").format("YYYY-M-D HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"startNextDay"}
          values={{startNextDay}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test startNextDay ${startNextDay}`);
  });

  it("startCurrentHour param", () => {
    const startCurrentHour = dayjs().startOf("hour").format("HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"startCurrentHour"}
          values={{startCurrentHour}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test startCurrentHour ${startCurrentHour}`);
  });

  it("endCurrentHour param", () => {
    const endCurrentHour = dayjs().endOf("hour").format("HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"endCurrentHour"}
          values={{endCurrentHour}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test endCurrentHour ${endCurrentHour}`);
  });

  it("startCurrentMinute param", () => {
    const startCurrentMinute = dayjs().startOf("minute").format("HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"startCurrentMinute"}
          values={{startCurrentMinute}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test startCurrentMinute ${startCurrentMinute}`);
  });

  it("endCurrentMinute param", () => {
    const endCurrentMinute = dayjs().endOf("minute").format("HH:mm:ss");
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"endCurrentMinute"}
          values={{endCurrentMinute}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test endCurrentMinute ${endCurrentMinute}`);
  });

  it("testedNumber param", () => {
    const testedNumber = globalFormatNumber(45412.564, {maximumFractionDigits: 2});
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"testedNumber"}
          values={{testedNumber}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test testedNumber ${testedNumber}`);
  });

  it("testedSomeValue param", () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"testedSomeValue"}
          values={{testedSomeValue: someValue}}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test testedSomeValue ${someValue}`);
  });

  it("allTypesKey param", () => {
    const currentDateTime = dayjs().format("YYYY-M-D HH:mm:ss");
    const testedNumber = globalFormatNumber(45412.564, {maximumFractionDigits: 2});
    TestRenderer.act(() => {
      TestRenderer.create(
        <I18nParamsComponent
          locale={"en"}
          messages={localesStore.messagesMapping["en"]}
          id={"allTypesKey"}
          values={{
            testedSomeValue: someValue,
            currentDateTime,
            testedNumber
          }}
        />
      )
    });
    expect(i18nKeyValue).toEqual(`test date currentDateTime ${currentDateTime} test number ${testedNumber} test some value ${someValue}`);
  });
})
