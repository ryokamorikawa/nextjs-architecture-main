---
to: <%= containerFilePath %>
skip_if: "<%= layer !== `Container and Presentational Components (View)` %>"
unless_exists: true
---
'use client';

import { useTranslation } from 'common/libs/i18n/client'; /// server componentとclient componentでimport先が異なる点に注意

import <%= Name %>Presentational from './<%= Name %>Presentational';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const <%= Name %>Container = ({ lng }: any): JSX.Element => {
  const { t } = useTranslation(lng);

  /*
    Presenter（カスタムフック）からerrorを受け取り、エラーの有無とその種別によって表示を変更する。
    例）予期せぬエラー（管理者が対応するエラー）が発生した場合はerror.tsxを表示、ユーザーに通知するエラーはPresentationalコンポーネントに渡すとした時
  */
  // const { error } = useGetWeather(weatherUsecaseInstance);
  // let errorText = undefined;
  // if (error !== undefined) {
  //   // バリデーションチェックエラーの内、文言が定義されている場合のみユーザーに知らせる
  //   if (error instanceof ValidateException) {
  //     // i18nextでは、t functionの引数に渡した文字列に一致するキーが無い場合に、引数に渡した文字列がそのまま返る
  //     if (t(`error.validation.${error.code}`) === `error.validation.${error.code}`) {
  //       throw error; // 文言が定義されていない場合、予期せぬエラーのためerror.tsxを表示
  //     } else {
  //       errorText = t(`error.validation.${error.code}`);
  //     }
  //   } else {
  //     // バリデーションエラー以外のエラーが発生した場合はerror.tsxを表示
  //     throw error;
  //   }
  // }

  return <<%= Name %>Presentational lng={lng} />;
};

export default <%= Name %>Container;