declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string
  ) => void;
  reloadAuthorized: () => void;
  ENUM: {
    [key: string]: unknown;
  };
  $store: {
    [key: string]: unknown;
    dispatch: () => {};
  };
}

declare let ga: Function;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

interface ClassDetail {
  class_mode?: number;
  class_room_id?: number;
  class_room_name?: string;
  class_begin_time: string;
  class_start_time?: string;
  class_end_time: string;
  name?: string;
}
interface HashMapObj {
  [key: string]: unknown;
}
declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    REACT_APP_MOCK_PATH: string;
    REACT_APP_ENV: string;
  }
}
