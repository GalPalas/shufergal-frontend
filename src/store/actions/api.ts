import { createAction } from "@reduxjs/toolkit";

export const apiCallBegin: any = createAction("api/callBegin");
export const apiCallSuccess: any = createAction("api/callSuccess");
export const apiCallFailed: any = createAction("api/callFailed");
