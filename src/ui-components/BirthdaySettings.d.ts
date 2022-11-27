/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BirthdaySettingsInputValues = {
    birthday?: string;
};
export declare type BirthdaySettingsValidationValues = {
    birthday?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BirthdaySettingsOverridesProps = {
    BirthdaySettingsGrid?: FormProps<GridProps>;
    birthday?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BirthdaySettingsProps = React.PropsWithChildren<{
    overrides?: BirthdaySettingsOverridesProps | undefined | null;
} & {
    initialData?: BirthdaySettingsInputValues;
    onSubmit: (fields: BirthdaySettingsInputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: BirthdaySettingsInputValues) => BirthdaySettingsInputValues;
    onValidate?: BirthdaySettingsValidationValues;
} & React.CSSProperties>;
export default function BirthdaySettings(props: BirthdaySettingsProps): React.ReactElement;
